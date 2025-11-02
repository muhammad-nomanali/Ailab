import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseclient";
import {
  Loader2,
  Edit2,
  Trash2,
  Eye,
  X,
  MoreVertical,
  Upload,
} from "lucide-react";

export default function Equipment() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Available");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setEquipments(data);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f);
    setImagePreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = null;
      if (file) {
        const filePath = `equipments/${Date.now()}-${file.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage
          .from("uploads")
          .getPublicUrl(data.path);
        imageUrl = publicData.publicUrl;
      }

      if (editingId) {
        await supabase
          .from("posts")
          .update({
            name,
            status,
            content,
            image_url:
              imageUrl || equipments.find((i) => i.id === editingId)?.image_url,
          })
          .eq("id", editingId);
        alert("✅ Equipment Updated!");
      } else {
        await supabase
          .from("posts")
          .insert([{ name, status, content, image_url: imageUrl }]);
        alert("✅ Equipment Added!");
      }
      resetForm();
      fetchEquipments();
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setContent("");
    setName("");
    setStatus("Available");
    setEditingId(null);
    setFile(null);
    setImagePreview(null);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setStatus(item.status);
    setContent(item.content);
    setEditingId(item.id);
    setImagePreview(item.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Equipment?")) return;
    await supabase.from("posts").delete().eq("id", id);
    fetchEquipments();
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        Equipment Management
      </h1>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Image Upload Box */}
        <div className="mb-4">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Upload className="w-12 h-12 mb-2" />
                <span>Click to upload image</span>
              </div>
            )}
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Equipment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-full border p-3 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Available</option>
            <option>Not Available</option>
          </select>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />}{" "}
            {editingId ? "Update Equipment" : "Add Equipment"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg ">
        <div className="p-5 border-b bg-gray-100 font-bold text-lg">
          Equipment List
        </div>
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((item, i) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 relative">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">
                  <img
                    src={item.image_url}
                    className="w-12 h-12 rounded-md object-cover border"
                  />
                </td>
                <td className="p-3 font-semibold">{item.name}</td>
                <td className="p-3 whitespace-nowrap min-w-[90px]">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  {item.content.split(" ").length > 10
                    ? item.content.split(" ").slice(0, 10).join(" ") + "..."
                    : item.content}
                </td>

                <td className="p-3 text-center relative">
                  <div className="relative inline-block">
                    <MoreVertical
                      className="cursor-pointer"
                      onClick={() => toggleMenu(item.id)}
                    />
                    {menuOpen === item.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border z-10">
                        <button
                          onClick={() => handleView(item)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Eye /> View
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Edit2 /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Trash2 /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
{showModal && selectedItem && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-[100%] max-w-xl relative overflow-hidden animate-[fadeInScale_.3s_ease]">
      
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition"
        onClick={() => setShowModal(false)}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="w-full h-72 overflow-hidden rounded-t-2xl">
        <img
          src={selectedItem.image_url}
          className="w-full h-full object-cover transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="font-bold text-2xl text-gray-800 mb-1">{selectedItem.name}</h2>

        <span className={`inline-block rounded-full text-xs font-semibold px-3 py-1 mb-3 ${
          selectedItem.status === "Available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {selectedItem.status}
        </span>

        <div className="max-h-52 overflow-y-auto pr-2 text-gray-600 leading-relaxed">
          {selectedItem.content}
        </div>
      </div>

    </div>
  </div>
)}


    </div>
  );
}

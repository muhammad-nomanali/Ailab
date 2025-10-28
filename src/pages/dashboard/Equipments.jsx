import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseclient";
import {
  Loader2,
  Upload,
  Edit2,
  Trash2,
  MoreVertical,
  Eye,
  X,
} from "lucide-react";

export default function Equipment() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  // 🧩 Fetch equipment
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error("Fetch error:", error);
    else setEquipments(data);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
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
        const { error } = await supabase
          .from("posts")
          .update({
            content,
            image_url:
              imageUrl ||
              equipments.find((eq) => eq.id === editingId)?.image_url,
          })
          .eq("id", editingId);

        if (error) throw error;
        alert("✅ Equipment updated successfully!");
      } else {
        const { error } = await supabase
          .from("posts")
          .insert([{ content, image_url: imageUrl }]);
        if (error) throw error;
        alert("✅ Equipment posted successfully!");
      }

      setContent("");
      setFile(null);
      setImagePreview(null);
      setEditingId(null);
      fetchEquipments();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setContent(item.content);
    setEditingId(item.id);
    setImagePreview(item.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;
    try {
      const { data: record } = await supabase
        .from("posts")
        .select("image_url")
        .eq("id", id)
        .single();

      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;

      if (record?.image_url) {
        const imagePath = record.image_url.split("/uploads/")[1];
        if (imagePath) {
          await supabase.storage.from("uploads").remove([imagePath]);
        }
      }

      alert("🗑️ Equipment deleted successfully!");
      fetchEquipments();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete: " + err.message);
    } finally {
      setMenuOpen(null);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* 🧾 Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Equipment Management
        </h1>
        <p className="text-gray-500 mt-2">
          Upload, edit, and manage your equipment efficiently
        </p>
      </div>

      {/* Upload Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {imagePreview && (
          <div className="mb-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-48 w-auto rounded-xl shadow-md border object-cover"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter equipment details..."
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows="3"
          />

          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <Upload className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-gray-600 font-medium">Upload Image</span>
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                {editingId ? "Updating..." : "Uploading..."}
              </>
            ) : editingId ? (
              <>
                <Edit2 className="w-5 h-5" /> Update Equipment
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" /> Post Equipment
              </>
            )}
          </button>
        </form>
      </div>

      {/* Equipment Table */}
      <div className="max-w-5xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Equipments
        </h2>

        {equipments.length === 0 ? (
          <p className="text-center text-gray-500">No equipment added yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Content</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt="Equipment"
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3">{item.content}</td>
                  <td className="p-3 text-center relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === item.id ? null : item.id)
                      }
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical />
                    </button>

                    {menuOpen === item.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-32 z-10">
                        <button
                          onClick={() => handleView(item)}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-yellow-600 hover:bg-yellow-50"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>
            {selectedItem.image_url && (
              <img
                src={selectedItem.image_url}
                alt="Equipment"
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Equipment Details
            </h3>
            <p className="text-gray-600">{selectedItem.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

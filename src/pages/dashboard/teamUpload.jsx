import { useState, useEffect } from "react";
import { supabase } from "../../supabaseclient";
import { MoreVertical } from "lucide-react";

const TeamUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [editId, setEditId] = useState(null);

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const getTeamMembers = async () => {
    let { data } = await supabase.from("team_members").select("*");
    setTeamList(data || []);
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = null;

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadErr } = await supabase.storage.from("team-images").upload(fileName, file);

        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from("team-images").getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      const payload = {
        name,
        role,
        department,
        bio,
        email,
        linkedin,
        github,
        skills: skills.split(",").map((s) => s.trim()),
        ...(image_url && { image_url }),
      };

      if (editId) {
        await supabase.from("team_members").update(payload).eq("id", editId);
        alert("✅ Updated Successfully");
      } else {
        await supabase.from("team_members").insert([payload]);
        alert("✅ Uploaded Successfully");
      }

      setName(""); setRole(""); setDepartment(""); setBio("");
      setEmail(""); setLinkedin(""); setGithub(""); setSkills("");
      setFile(null); setEditId(null);
      getTeamMembers();
    } catch (error) {
      console.log(error);
      alert("❌ Upload Failed");
    }

    setLoading(false);
  };

  // ✅ Fully working delete with image remove
  const deleteMember = async (m) => {
    if (!confirm("Delete this team member?")) return;

    try {
      const fileUrl = m.image_url;
      const fileName = fileUrl?.split("/").pop();

      const { error: deleteError } = await supabase.from("team_members").delete().eq("id", m.id);
      if (deleteError) throw deleteError;

      // delete image
      if (fileName) {
        await supabase.storage.from("team-images").remove([fileName]);
      }

      alert("✅ Member Deleted");
      getTeamMembers();
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed, check RLS");
    }
  };

  const editMember = (m) => {
    setEditId(m.id);
    setName(m.name);
    setRole(m.role);
    setDepartment(m.department);
    setBio(m.bio);
    setEmail(m.email);
    setLinkedin(m.linkedin);
    setGithub(m.github);
    setSkills(Array.isArray(m.skills) ? m.skills.join(", ") : m.skills || "");
  };

  const handleView = (m) => {
    setSelectedMember(m);
    setViewModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        {editId ? "Edit Team Member" : "Upload Team Member"}
      </h2>

      {/* Form */}
      <form onSubmit={handleUpload} className="grid grid-cols-2 gap-3 mb-8">
        <input className="border p-2 rounded" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Department" value={department} onChange={(e)=>setDepartment(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="border p-2 rounded" placeholder="LinkedIn URL" value={linkedin} onChange={(e)=>setLinkedin(e.target.value)} />
        <input className="border p-2 rounded" placeholder="GitHub URL" value={github} onChange={(e)=>setGithub(e.target.value)} />

        <textarea className="border p-2 rounded col-span-2" placeholder="Bio" value={bio} onChange={(e)=>setBio(e.target.value)} />
        <input className="border p-2 rounded col-span-2" placeholder="Skills (comma separated)" value={skills} onChange={(e)=>setSkills(e.target.value)} />

        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className="border p-2 rounded col-span-2" />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2">
          {loading ? "Processing..." : editId ? "Update Member" : "Upload Member"}
        </button>
      </form>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-lg">
        <div className="p-5 border-b bg-gray-100 font-bold text-lg">Team Members</div>

        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Skills</th>
            <th className="p-3">Email</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
          </thead>

          <tbody>
          {teamList.map((m, i) => (
            <tr key={m.id} className="border-b hover:bg-gray-50 relative">
              <td className="p-3">{i + 1}</td>
              <td className="p-3"><img src={m.image_url} className="w-12 h-12 rounded-md border object-cover" /></td>
              <td className="p-3 font-semibold">{m.name}</td>
              <td className="p-3">{m.role}</td>
              <td className="p-3">{Array.isArray(m.skills) ? m.skills.slice(0, 3).join(", ") : ""}{m.skills?.length > 3 && " ..."}</td>
              <td className="p-3">{m.email}</td>

              <td className="p-3 text-center relative">
                <MoreVertical className="cursor-pointer" onClick={() => toggleMenu(m.id)} />

                {menuOpen === m.id && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border z-20 w-32">
                    <button onClick={() => handleView(m)} className="w-full text-left px-4 py-2 hover:bg-gray-100">👁 View</button>
                    <button onClick={() => editMember(m)} className="w-full text-left px-4 py-2 hover:bg-gray-100">✏ Edit</button>
                    <button onClick={() => deleteMember(m)} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">🗑 Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewModal && selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-xl relative">
            <button onClick={() => setViewModal(false)} className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">✖</button>

            <div className="flex flex-col items-center text-center">
              <img src={selectedMember.image_url} className="w-28 h-28 rounded-full object-cover border mb-3" />
              <h2 className="text-xl font-bold">{selectedMember.name}</h2>
              <p className="text-gray-600">{selectedMember.role}</p>
              <p className="text-sm text-gray-500 mb-3">{selectedMember.department}</p>

              <div className="flex gap-2 flex-wrap my-2">
                {(Array.isArray(selectedMember.skills)
                  ? selectedMember.skills
                  : selectedMember.skills?.split(",") || []
                ).map((s, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">{s}</span>
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4">{selectedMember.bio}</p>

              <div className="flex flex-col gap-2 w-full">
                {selectedMember.email && <a href={`mailto:${selectedMember.email}`} className="text-blue-600 underline">📧 {selectedMember.email}</a>}
                {selectedMember.linkedin && <a href={selectedMember.linkedin} target="_blank" className="text-blue-600 underline">🔗 LinkedIn</a>}
                {selectedMember.github && <a href={selectedMember.github} target="_blank" className="text-gray-800 underline">💻 GitHub</a>}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeamUpload;

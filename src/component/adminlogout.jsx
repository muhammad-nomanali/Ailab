import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="...">
      <button onClick={handleLogout} className="text-red-500 ml-auto">Logout</button>
    </nav>
  );
};

export default AdminLogout
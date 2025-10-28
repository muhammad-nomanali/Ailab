// import { useState } from "react";
import AdminLogout from "../component/adminlogout";
import SideBar from "../component/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-gray-800 text-white transition-all duration-300}`}
      >
        <SideBar />
      </aside>

      <main className="flex-1 bg-gray-100 min-h-screen">
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <AdminLogout />
        </nav>
        <div className="p-6 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

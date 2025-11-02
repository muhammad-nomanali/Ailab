import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout.jsx";
import Home from "../Layout/home";
import About from "../Layout/about";
import Teams from "../Layout/teams";
import Projects from "../Layout/projects";
import Labs from "../Layout/labs";
import Login from "../Layout/login";
import AdminDashboard from "../Layout/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import LabRequestForm from "./labrequestform.jsx";
import EquipmentRequestForm from "./equiprequestform.jsx";

// Admin section pages
import General from "../pages/dashboard/General.jsx";
import Equipments from "../pages/dashboard/Equipments.jsx";
import Approvals from "../pages/dashboard/Approvals.jsx";
import EquipmentsIsued from "../pages/dashboard/inventoryissued.jsx";

import Lab2 from "../Layout/lab2.jsx";

// ✅ Import Equipment Detail Page
import EquipmentDetail from "../pages/dashboard/euipnmentDetail.jsx";
import TeamUpload from "../pages/dashboard/teamUpload.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "team", element: <Teams /> },
      { path: "project", element: <Projects /> },
      { path: "lab", element: <Labs /> },
      { path: "lab2", element: <Lab2 /> },
      { path: "labRequestForm", element: <LabRequestForm /> },
      { path: "equipRequestForm", element: <EquipmentRequestForm /> },

      // ✅ Add detail route here
      { path: "equipment/:id", element: <EquipmentDetail /> },
    ],
  },

  { path: "/login", element: <Login /> },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <General /> },
      { path: "general", element: <General /> },
      { path: "equipment", element: <Equipments /> },
      { path: "approvals", element: <Approvals /> },
      { path: "issued", element: <EquipmentsIsued /> },
     { path: "teamUpload", element: <TeamUpload /> },

    ],
  },
]);

export default router;

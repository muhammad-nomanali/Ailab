// component/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />  {/* This renders the current page */}
      <Footer />
    </>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);


    const menuItems = [
        {
            label: "General",
            link: "/admin/general",
            iconPath: (
                <path d="M4 6h16M4 12h16M4 18h16" />
            ),
        },
        {
            label: "Equpiments",
            link: "/admin/equipment",
            iconPath: (
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m0 0H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            ),
        },
          {
            label: "Equpiments Issued",
            link: "/admin/issued",
            iconPath: (
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m0 0H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            ),
        },
        {
            label: "Approvals",
            link: "/admin/approvals",
            iconPath: (
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            ),
        },
    ];

    return (

        <div
            className={`${isCollapsed ? "w-16" : "w-64"
                } bg-white border-r h-full transition-all duration-300 flex flex-col justify-between`}
        >
            <div>
                {/* Collapse Toggle Button */}
                <div className="flex items-center justify-between p-4 border-b">
                    <span className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Logo</span>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        {isCollapsed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col space-y-2 p-4 text-sm">
                    {menuItems.map(({ label, link, iconPath }, index) => (
                        <NavLink
                            key={index}
                            to={link}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 rounded-md px-2 py-2 hover:bg-gray-100 ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
                                }`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {iconPath}
                            </svg>
                            {!isCollapsed && <span>{label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout */}
            <div className="p-4 border-t">
                <a
                    href="#"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        <path d="M7 20h4a3 3 0 003-3v-1" />
                    </svg>
                    {!isCollapsed && <span>Logout</span>}
                </a>
            </div>
        </div>


    );
};

export default SideBar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidePanel = () => {

  const location = useLocation();

  const items = [
    { path: "/home", label: "Home" },
    { path: "/dashboard/documents", label: "Documents" },
    { path: "/dashboard/upload", label: "Upload" },
    { path: "/dashboard/chat", label: "Chat" }
  ];

  return (

    <aside className="w-64 bg-[#0b0b0b] border-r border-gray-800 min-h-screen text-white">

      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">HealthSentinel</h1>
      </div>

      <nav className="p-4 flex flex-col gap-3">

        {items.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          );

        })}

      </nav>

    </aside>

  );
};

export default SidePanel;
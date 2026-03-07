import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    navigate("/login");
  };

  return (

    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white border-b border-gray-800">

      <Link to="/" className="text-xl font-bold">
        HealthSentinel
      </Link>

      <div className="flex gap-6">

        <Link to="/about">About</Link>

        {token ? (

          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Dashboard
            </button>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>

        )}

      </div>

    </nav>
  );
}
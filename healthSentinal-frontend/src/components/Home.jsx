import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh]">

        <h1 className="text-4xl font-bold mb-6">
          HealthSentinel
        </h1>

        <p className="text-gray-400 mb-6">
          Secure AI Healthcare Document Intelligence
        </p>

        {token ? (

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 px-6 py-3 rounded"
          >
            Go to Dashboard
          </button>

        ) : (

          <div className="flex gap-4">

            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 px-6 py-3 rounded"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-purple-600 px-6 py-3 rounded"
            >
              Signup
            </button>

          </div>

        )}

      </div>

    </div>
  );
}
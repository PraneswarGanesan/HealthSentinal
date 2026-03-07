import React, { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      await signup(email, password);

      alert("Signup successful");

      navigate("/login");

    } catch {

      alert("Signup failed");
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">

        <div className="bg-gray-900 p-8 rounded w-96">

          <h2 className="text-2xl mb-6">Signup</h2>

          <input
            className="w-full p-2 mb-4 bg-black border border-gray-700"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 mb-4 bg-black border border-gray-700"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="bg-green-600 w-full py-2"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}
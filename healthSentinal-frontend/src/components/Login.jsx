import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import Navbar from "./Navbar";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user_id", res.user.id);
      localStorage.setItem("email", res.user.email);

      navigate("/dashboard");

    } catch (err) {

      alert("Login failed");
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">

        <div className="bg-gray-900 p-8 rounded w-96">

          <h2 className="text-2xl mb-6">Login</h2>

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
            onClick={handleLogin}
            className="bg-blue-600 w-full py-2"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}
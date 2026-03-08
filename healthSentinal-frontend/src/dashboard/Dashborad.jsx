import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SidePanel from "./panel";
import Documents from "./Documents";
import UploadDocument from "./UploadDocument";
import ChatWindow from "./ChatWindow";

const Stub = ({ title }) => (
  <div className="p-8 text-white">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <p className="text-white/70 mt-2">Dashboard area</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">

      <SidePanel />

      <main className="flex-1 bg-black border-l border-[#1c2e3c]">

        <Routes>

          <Route path="/" element={<Navigate to="documents" replace />} />

          <Route path="documents" element={<Documents />} />

          <Route path="upload" element={<UploadDocument />} />

          <Route path="chat" element={<ChatWindow />} />

          <Route path="*" element={<Stub title="Not Found" />} />

        </Routes>

      </main>   

    </div>
  );
};

export default Dashboard;
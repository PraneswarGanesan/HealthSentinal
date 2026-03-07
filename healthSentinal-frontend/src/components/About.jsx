import React from "react";
import Navbar from "./Navbar";

export default function About() {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-3xl mb-4">
          About HealthSentinel
        </h1>

        <p className="text-gray-400 max-w-3xl">

          HealthSentinel is a secure healthcare document intelligence
          platform that allows users to upload, analyze, and query
          medical documents using AI-powered retrieval systems.

        </p>

      </div>

    </div>
  );
}
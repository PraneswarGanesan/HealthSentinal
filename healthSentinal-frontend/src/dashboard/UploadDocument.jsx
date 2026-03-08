import React, { useState } from "react";
import { uploadDocument } from "../api/documentApi";

const UploadDocument = () => {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const userId = localStorage.getItem("user_id");

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadDocument(userId, formData);

      // backend returns array
      setResponseData(response[0]);

      alert("Uploaded successfully");

    } catch (error) {

      console.error("Upload failed:", error);
      alert("Upload failed");

    } finally {

      setUploading(false);

    }

  };

  return (

    <div className="p-8 text-white">

      <h1 className="text-xl mb-6 font-semibold">Upload Document</h1>

      <div className="flex flex-col gap-4 max-w-md">

        <input
          type="file"
          onChange={handleFileChange}
          className="bg-gray-800 p-2 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

      </div>

      {responseData && (

        <div className="mt-6 p-4 bg-gray-900 rounded">

          <h2 className="text-lg mb-3">Upload Result</h2>

          <p><strong>File:</strong> {responseData.filename}</p>
          <p><strong>ID:</strong> {responseData.id}</p>
          <p><strong>Signature:</strong> {responseData.signature_path}</p>
          <p><strong>Created:</strong> {responseData.created_at}</p>

        </div>

      )}

    </div>

  );

};

export default UploadDocument;
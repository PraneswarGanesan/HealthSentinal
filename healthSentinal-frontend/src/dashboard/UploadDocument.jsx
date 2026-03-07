import React, { useState } from "react";
import { uploadDocument } from "../api/documentApi";

const UploadDocument = () => {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) return;

    await uploadDocument(file);

    alert("Uploaded successfully");

  };

  return (

    <div className="p-8 text-white">

      <h1 className="text-xl mb-4">Upload Document</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="bg-blue-600 px-4 py-2 mt-4"
        onClick={handleUpload}
      >
        Upload
      </button>

    </div>

  );
};

export default UploadDocument;
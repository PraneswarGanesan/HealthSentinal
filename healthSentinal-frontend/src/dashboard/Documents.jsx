import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  listDocuments,
  updateDocument,
  deleteDocument
} from "../api/documentApi";

const S3_BASE = "https://health-sentinal-bucket.s3.amazonaws.com/";

const Documents = () => {

  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const data = await listDocuments();
    setDocs(data);
  };

  const openDocument = async (doc) => {

    try {

      setSelectedDoc(doc);

      const fileUrl = `${S3_BASE}${doc.s3_path}`;
      const sigUrl = `${S3_BASE}${doc.signature_path}`;

      const fileRes = await fetch(fileUrl);
      const text = await fileRes.text();

      const sigRes = await fetch(sigUrl);
      const sigText = await sigRes.text();

      setContent(text);
      setSignature(sigText);

    } catch (err) {
      console.error("Failed to load document", err);
    }

  };

  const handleUpdate = async () => {

    if (!selectedDoc) return;

    const blob = new Blob([content], { type: "text/plain" });
    const file = new File([blob], selectedDoc.filename);

    await updateDocument(selectedDoc.id, file);

    alert("Document updated");

    fetchDocs();

  };

  const handleDelete = async () => {

    if (!selectedDoc) return;

    if (!window.confirm("Delete this document?")) return;

    await deleteDocument(selectedDoc.id);

    setSelectedDoc(null);
    setContent("");
    setSignature("");

    fetchDocs();

  };

  return (

    <div className="flex h-screen bg-black text-white">

      {/* DOCUMENT LIST */}

      <div className="w-80 border-r border-gray-800 p-4 overflow-y-auto">

        <h2 className="text-lg mb-4 font-semibold">Documents</h2>

        {docs.map((doc) => (

          <div
            key={doc.id}
            className="cursor-pointer p-3 mb-2 bg-gray-900 hover:bg-gray-800 rounded"
            onClick={() => openDocument(doc)}
          >

            <div className="font-medium">{doc.filename}</div>

            <div className="text-xs text-gray-400">
              {new Date(doc.created_at).toLocaleString()}
            </div>

          </div>

        ))}

      </div>


      {/* EDITOR AREA */}

      <div className="flex-1 flex flex-col">

        {selectedDoc ? (

          <>

            {/* ACTION BAR */}

            <div className="flex gap-3 p-3 border-b border-gray-800">

              <button
                onClick={handleUpdate}
                className="bg-blue-600 px-4 py-1 rounded"
              >
                Update
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-1 rounded"
              >
                Delete
              </button>

              <div className="text-gray-400 ml-4">
                {selectedDoc.filename}
              </div>

            </div>


            {/* EDITOR + SIGNATURE */}

            <div className="flex flex-1">

              {/* DOCUMENT EDITOR */}

              <div className="flex-1 border-r border-gray-800">

                <Editor
                  height="100%"
                  theme="vs-dark"
                  language="markdown"
                  value={content}
                  onChange={(v) => setContent(v)}
                />

              </div>


              {/* SIGNATURE VIEW */}

              <div className="w-96 p-4 bg-gray-950 overflow-auto">

                <h3 className="mb-3 text-gray-300">Document Signature</h3>

                <pre className="text-xs text-green-400 break-all">
                  {signature}
                </pre>

              </div>

            </div>

          </>

        ) : (

          <div className="flex items-center justify-center h-full text-gray-500">
            Select a document to view
          </div>

        )}

      </div>

    </div>

  );

};

export default Documents;
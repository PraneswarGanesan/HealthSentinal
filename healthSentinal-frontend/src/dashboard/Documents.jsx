import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { listDocuments, getDocument } from "../api/documentApi";

const Documents = () => {

  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {

    fetchDocs();

  }, []);

  const fetchDocs = async () => {

    const data = await listDocuments();

    setDocs(data);

  };

  const openDocument = async (id) => {

    const doc = await getDocument(id);

    setSelectedDoc(id);

    setContent(doc.content || "");

  };

  return (

    <div className="flex h-full">

      {/* document list */}

      <div className="w-72 border-r border-gray-800 p-4 text-white">

        <h2 className="text-lg mb-4">Documents</h2>

        {docs.map((doc) => (

          <div
            key={doc.id}
            className="cursor-pointer p-2 hover:bg-gray-800 rounded"
            onClick={() => openDocument(doc.id)}
          >
            {doc.filename}
          </div>

        ))}

      </div>

      {/* editor */}

      <div className="flex-1">

        {selectedDoc ? (

          <Editor
            height="90vh"
            theme="vs-dark"
            language="markdown"
            value={content}
            onChange={(v) => setContent(v)}
          />

        ) : (

          <div className="text-gray-500 p-8">
            Select a document to edit
          </div>

        )}

      </div>

    </div>
  );
};

export default Documents;
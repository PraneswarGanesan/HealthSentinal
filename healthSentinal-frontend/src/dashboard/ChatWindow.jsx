import React, { useState } from "react";
import { askQuery } from "../api/queryApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ChatWindow = () => {

  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {

    if (!query) return;

    setLoading(true);

    try {

      const res = await askQuery(query);

      setAnswer(res.answer || "");

      const docs = res.documents || [];

      setDocuments(docs);

    } catch (err) {

      console.error("Query failed", err);

    } finally {

      setLoading(false);

    }

  };

  const chartData = documents.map((doc, index) => ({
    name: `Doc ${index + 1}`,
    length: doc.length
  }));

  return (

    <div className="p-8 text-white h-full flex flex-col gap-6">

      <h2 className="text-2xl font-semibold">Chat With Documents</h2>

      {/* Query input */}

      <div className="flex gap-4">

        <input
          className="flex-1 p-3 bg-black border border-gray-700 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
        />

        <button
          onClick={ask}
          className="bg-green-600 px-6 py-2 rounded"
        >
          Ask
        </button>

      </div>

      {loading && (
        <div className="text-gray-400">Processing query...</div>
      )}

      {/* Answer section */}

      {answer && (

        <div className="bg-black border border-gray-800 p-6 rounded">

          <h3 className="text-lg mb-3 text-green-400">Answer</h3>

          <p className="text-gray-200 whitespace-pre-wrap">
            {answer}
          </p>

        </div>

      )}

      {/* Retrieval visualization */}

      {documents.length > 0 && (

        <div className="bg-black border border-gray-800 p-6 rounded">

          <h3 className="text-lg mb-4 text-blue-400">
            Retrieved Documents Visualization
          </h3>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer>

              <BarChart data={chartData}>

                <XAxis dataKey="name" stroke="#aaa" />

                <YAxis stroke="#aaa" />

                <Tooltip />

                <Bar dataKey="length" fill="#3b82f6" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

      {/* Documents preview */}

      {documents.length > 0 && (

        <div className="bg-black border border-gray-800 p-6 rounded">

          <h3 className="text-lg mb-4 text-yellow-400">
            Retrieved Documents
          </h3>

          <div className="grid gap-4">

            {documents.map((doc, index) => (

              <div
                key={index}
                className="border border-gray-700 p-4 rounded bg-gray-900"
              >

                <div className="text-sm text-gray-400 mb-2">
                  Document {index + 1}
                </div>

                <pre className="text-sm whitespace-pre-wrap text-gray-200">
                  {doc.slice(0, 800)}
                </pre>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

};

export default ChatWindow;
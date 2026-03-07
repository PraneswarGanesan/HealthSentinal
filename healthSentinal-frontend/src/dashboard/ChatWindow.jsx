import React, { useState } from "react";
import { askQuery } from "../api/queryApi";

const ChatWindow = () => {

  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {

    const res = await askQuery(query);

    setAnswer(res.answer || JSON.stringify(res));

  };

  return (

    <div className="p-8 text-white">

      <h2 className="text-xl mb-4">Chat With Documents</h2>

      <input
        className="w-full p-3 bg-black border border-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
      />

      <button
        onClick={ask}
        className="mt-4 bg-green-600 px-4 py-2"
      >
        Ask
      </button>

      <div className="mt-6 bg-black border border-gray-800 p-4">

        {answer}

      </div>

    </div>
  );
};

export default ChatWindow;
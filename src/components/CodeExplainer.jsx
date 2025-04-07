import { useState } from "react";

export default function CodeExplainer() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.PROD
    ? "/api/explain" // Production URL (relative path)
    : "http://localhost:5000/api/explain"; // Development URL

  const explainCode = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setExplanation(data.explanation);
    } catch (error) {
      setExplanation("Error occurred while explaining code.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Code Explainer</h1>
      <textarea
        className="w-full h-40 p-2 border rounded mb-4"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={explainCode}
        disabled={loading}
      >
        {loading ? "Explaining..." : "Explain Code"}
      </button>
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <strong>Explanation:</strong>
        <p className="mt-2 whitespace-pre-wrap">{explanation}</p>
      </div>
    </div>
  );
}

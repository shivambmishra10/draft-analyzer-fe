import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // For collapsible icons

const InsightSection = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const handleSummarize = () => {
    setShowSummary(!showSummary);
    if (showScore) setShowScore(false); // Close score if open
  };

  const handleScore = () => {
    setShowScore(!showScore);
    if (showSummary) setShowSummary(false); // Close summary if open
  };

  return (
    <section className="p-8 bg-gray-50 rounded-lg shadow-md mt-8 mx-4 flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Get Your Document Insights</h2>
      <p className="text-gray-600 mb-6 max-w-lg">
        Easily summarize and score your policy documents with just a few clicks.
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSummarize}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
        >
          Summarize
        </button>
        <button
          onClick={handleScore}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md transition"
        >
          Score
        </button>
      </div>

      {/* Summary Section */}
      {showSummary && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-2xl transition-all duration-300">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => setShowSummary(false)}
          >
            <h3 className="text-lg font-semibold text-blue-600">Summary</h3>
            <ChevronUp className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-gray-700 text-left">
            📄 Your document has been summarized successfully! 
            <br />Here is a short overview of the key points, objectives, and highlights.
          </p>
        </div>
      )}

      {/* Score Section */}
      {showScore && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-2xl transition-all duration-300 mt-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => setShowScore(false)}
          >
            <h3 className="text-lg font-semibold text-green-600">Score</h3>
            <ChevronUp className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-gray-700 text-left">
            ✅ Your document received a policy clarity score of 85% and impact assessment rating of 90%. 
            <br />Opportunities for improvement identified in public participation sections.
          </p>
        </div>
      )}
    </section>
  );
};

export default InsightSection;

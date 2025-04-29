import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const InsightSection = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const handleSummarize = () => {
    setShowSummary(!showSummary);
    if (showScore) setShowScore(false);
  };

  const handleScore = () => {
    setShowScore(!showScore);
    if (showSummary) setShowSummary(false);
  };

  const pieData = [
    { name: 'Objectives', value: 25 },
    { name: 'Implementation', value: 20 },
    { name: 'Clarity', value: 20 },
    { name: 'Equity', value: 15 },
    { name: 'Funding', value: 20 },
  ];

  const barData = [
    { name: 'Environmental', score: 88 },
    { name: 'Economic', score: 65 },
    { name: 'Social', score: 78 },
    { name: 'Governance', score: 80 },
    { name: 'Technology', score: 70 },
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A9A9F5'];

  return (
    <section className="p-8 bg-gray-50 rounded-lg shadow-md mt-8 mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Get Your Document Insights</h2>
      <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
        Easily summarize and score your policy documents with just a few clicks.
      </p>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={handleSummarize}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
        >
          Summarize
        </button>
        <button
          onClick={handleScore}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
        >
          📊 View Scores
        </button>
      </div>

      {/* Summary Section */}
      {showSummary && (
        <div className="bg-gray-100 border border-gray-300 rounded-md p-6">
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowSummary(false)}>
            <h3 className="text-xl font-semibold">Document Summary</h3>
            <ChevronUp className="text-gray-500" />
          </div>
          <div className="text-gray-800 text-sm leading-relaxed space-y-2">
            <ul className="list-disc list-inside">
              <li>Reducing carbon emissions by 40% by 2035</li>
              <li>Implementing green building standards for all new construction</li>
              <li>Expanding public transportation networks to reduce car dependency</li>
              <li>Creating community green spaces within 10-minute walking distance of all residential areas</li>
              <li>Developing water conservation strategies and infrastructure</li>
            </ul>
            <p>
              The policy emphasizes community involvement in planning processes and equitable distribution of
              environmental benefits across all neighborhoods. Implementation will occur in three phases, with the
              initial focus on regulatory framework development, followed by infrastructure investment, and concluding
              with monitoring and refinement.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 text-sm">
              ⬇️ Download Summary
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              💾 Save to Database
            </button>
          </div>
        </div>
      )}

      {/* Score Section */}
      {showScore && (
        <div className="bg-white border border-gray-200 rounded-md p-6 w-full mt-4">
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowScore(false)}>
            <h3 className="text-xl font-semibold">Document Score Analysis</h3>
            <ChevronUp className="w-5 h-5 text-gray-500" />
          </div>

          {/* Score Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-2xl font-bold text-blue-600">8.4</p>
              <p className="text-sm text-gray-600">Overall Score</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-2xl font-bold text-blue-600">93%</p>
              <p className="text-sm text-gray-600">Clarity Rating</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-2xl font-bold text-blue-600">87%</p>
              <p className="text-sm text-gray-600">Implementation Detail</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-2xl font-bold text-blue-600">76%</p>
              <p className="text-sm text-gray-600">Stakeholder Engagement</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <h4 className="text-md font-semibold mb-2 text-center">Policy Element Scores</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <h4 className="text-md font-semibold mb-2 text-center">Performance by Category</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InsightSection;

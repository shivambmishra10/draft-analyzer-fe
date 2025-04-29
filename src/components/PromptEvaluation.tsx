import React from 'react';

type PromptEvaluation = {
  question: string;
  answer: string;
  score: number;
  maxScore: number;
};

const evaluations: PromptEvaluation[] = [
  {
    question: "What are the main policy objectives?",
    answer:
      "The main objectives are carbon emission reduction, green building implementation, public transit expansion, community green space creation, and water conservation.",
    score: 9.5,
    maxScore: 10,
  },
  {
    question: "How does this policy address equity concerns?",
    answer:
      "The policy explicitly addresses equity through mandating equal distribution of environmental benefits across neighborhoods and requiring community involvement in planning processes, though specifics on implementation are somewhat limited.",
    score: 7.8,
    maxScore: 10,
  },
  {
    question: "What is the implementation timeline?",
    answer:
      "Implementation occurs in three phases: regulatory framework development (years 1–2), infrastructure investment (years 3–7), and monitoring/refinement (years 8–10).",
    score: 9.0,
    maxScore: 10,
  },
  {
    question: "What funding mechanisms are proposed?",
    answer:
      "The document lacks clear funding mechanisms beyond mentioning public-private partnerships and potential federal grants, with no specific budget allocations or revenue sources identified.",
    score: 5.2,
    maxScore: 10,
  },
];

const getBadgeColor = (score: number) => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-yellow-400';
  return 'bg-red-500';
};

const PromptEvaluation = () => {
  return (
    <section className="p-8 bg-white rounded-lg shadow-md mt-8 mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Evaluation by Prompts</h2>

      <div className="space-y-6">
        {evaluations.map((evalItem, index) => (
          <div key={index} className="border-l-4 pl-4 border-blue-500 bg-gray-50 p-4 rounded">
            <h3 className="text-md font-semibold text-blue-700 mb-1">{evalItem.question}</h3>
            <p className="text-gray-700 mb-2">{evalItem.answer}</p>
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded ${getBadgeColor(
                evalItem.score
              )}`}
            >
              {evalItem.score}/{evalItem.maxScore}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition">
          ⬇ Download Results
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          💾 Save to Database
        </button>
      </div>
    </section>
  );
};

export default PromptEvaluation;

import React, { useEffect, useState } from 'react';
import { fetchAssessments } from '@/services/api';

type Criterion = {
  title: string;
  description: string;
};

type AssessmentItem = {
  id: number;
  title: string;
  description: string;
  criteria: Criterion[];
};

const AssessmentFramework: React.FC = () => {
  const [data, setData] = useState<AssessmentItem[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAssessments();
        setData(response);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    loadData();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Assessment Framework</h2>
      {data.map((item, index) => (
        <div key={item.id} className="bg-white shadow rounded p-4">
          <button
            onClick={() => toggleOpen(index)}
            className="text-left w-full focus:outline-none"
          >
            <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </button>
          {openIndexes.includes(index) && (
            <ul className="list-disc list-inside mt-4 space-y-2">
              {item.criteria.map((criterion, idx) => (
                <li key={idx}>
                  <strong>{criterion.title}:</strong> {criterion.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssessmentFramework;

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Using lucide icons for collapse

const PreviewSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const extractedText = `
    This policy document outlines initiatives aimed at improving women's safety across urban and rural regions.
    It covers preventive strategies, reporting mechanisms, rehabilitation programs, and community awareness campaigns.
    The document stresses the importance of public participation and calls for inter-departmental collaboration.
    Further actions include legal reforms, technological enhancements for better safety, and budget allocation details.
    Implementation phases are scheduled over the next 5 years.
    `;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="p-8 bg-gray-50 rounded-lg shadow-md mt-8 mx-4 flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Preview Your Policy Document</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Here's a preview of your uploaded document. Review it before proceeding with summarization and scoring.
      </p>

      <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpand}>
          <h3 className="text-left text-lg font-semibold text-blue-600">Extracted Text</h3>
          {isExpanded ? <ChevronUp className="h-6 w-6 text-blue-600" /> : <ChevronDown className="h-6 w-6 text-blue-600" />}
        </div>

        {isExpanded && (
          <div className="bg-gray-100 p-4 rounded-md h-64 overflow-y-auto text-left whitespace-pre-line text-gray-700">
            {extractedText}
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewSection;

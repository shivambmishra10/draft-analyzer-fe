import React from 'react';

const ActionSection = () => {
  return (
    <section className="p-8 bg-gray-50 rounded-lg shadow mt-6 mx-4 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">Take Action on Your Summary</h2>
        <p className="text-gray-700 mb-6">
          Choose how you want to save or download your document summary for future reference.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition">
            Download
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition">
            Save
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-48 h-48 bg-gray-300 rounded-lg flex justify-center items-center">
          <span className="text-gray-600">Image</span>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;

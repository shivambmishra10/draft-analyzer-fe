import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile.name);
      // upload logic here
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <section className="p-8 bg-white rounded-lg shadow-md mt-6 mx-4 flex flex-col items-center text-center">
      <div className="flex items-center gap-3 mb-4">
        <UploadCloud className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold">Document Summarizer</h2>
      </div>
      <p className="text-gray-600 mb-6 max-w-md">
        Upload your policy or document files here to generate a smart summary instantly.
      </p>

      {/* Browse File */}
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition mb-6 w-full max-w-md">
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
        />
        <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-gray-500">
          {selectedFile ? selectedFile.name : 'Click to browse a file'}
        </span>
      </label>

      {/* Upload Button */}
      <button 
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Upload
      </button>
    </section>
  );
};

export default UploadSection;

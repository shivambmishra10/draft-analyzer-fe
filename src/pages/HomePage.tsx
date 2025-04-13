import React, { useState } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-6 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-gray-800">Analyze a Policy Document</h2>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Upload & Analyze'}
            </button>

            {result && (
              <div>
                <h3 className="text-lg font-semibold mt-6 mb-2">Results</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>

    </div>
  );
};

export default HomePage;

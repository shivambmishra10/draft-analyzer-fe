
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function UploadPolicy() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:8080/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError('Failed to upload or analyze document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Policy'}
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Policy Evaluation Results</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analysis.criteriaScores}>
                <XAxis dataKey="criterion" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

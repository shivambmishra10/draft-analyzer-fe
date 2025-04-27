import { useEffect, useState } from 'react';
import { getSummaryResult, downloadPDF } from '@/services/policyService';
import { Button } from '@/components/ui/button';

export const SummaryResult = ({ summaryId }: { summaryId: string }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSummaryResult(summaryId).then(setData);
  }, [summaryId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <p>{data.summaryText}</p>

      <h3 className="text-lg font-semibold mt-4">Answers</h3>
      <ul className="list-disc pl-6 space-y-2">
        {data.answers.map((a: any, index: number) => (
          <li key={index}>
            <strong>{a.prompt}</strong>: {a.answer} (Score: {a.score})
          </li>
        ))}
      </ul>

      <Button onClick={() => downloadPDF(summaryId)}>Download PDF</Button>
    </div>
  );
};

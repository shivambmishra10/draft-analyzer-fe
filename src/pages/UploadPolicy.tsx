import { useState } from 'react';
import { UploadForm } from '@/components/UploadForm';
import { SummaryResult } from '@/components/SummaryResult';

const UploadPolicy = () => {
  const [summaryId, setSummaryId] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      {!summaryId ? (
        <UploadForm onUploadComplete={setSummaryId} />
      ) : (
        <SummaryResult summaryId={summaryId} />
      )}
    </div>
  );
};

export default UploadPolicy;

import React, { useEffect, useState } from 'react';
import AssessmentFramework from './AssessmentFramework';
import { Assessment, DocumentType } from '@/model/DocumentModels';
import { getAssessmentsByDocumentType } from '@/services/documentService';

const AssessmentModal: React.FC<{ documentType: DocumentType }> = ({ documentType }) => {
  const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessmentsByDocumentType(documentType.id);
        setAssessmentData(data);
      } catch (err) {
        setError('Failed to fetch assessments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [documentType.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {assessmentData.map((item, index) => (
        <AssessmentFramework key={index} assessment={item} index={index + 1} />
      ))}
    </div>
  );
};

export default AssessmentModal;

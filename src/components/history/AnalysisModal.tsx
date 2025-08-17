import React from 'react';
import { Modal } from 'antd';
import InsightSection from '../upload-section/evaluation/InsightSection';
import { DocumentHistory } from '@/model/HistoryModel';

interface AnalysisModalProps {
  document: DocumentHistory | null;
  visible: boolean;
  onClose: () => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ 
  document, 
  visible, 
  onClose 
}) => {
  if (!document) return null;

  return (
    <Modal
      title={`Document Analysis - ${document.file_name}`}
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <InsightSection 
          docSummaryId={document.doc_summary_id} 
          isHistoryMode={true} 
        />     
      </div>
    </Modal>
  );
};

export default AnalysisModal;

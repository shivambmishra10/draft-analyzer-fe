import React from "react";
import { Typography } from "antd";
import DocumentList from "@/components/history/DocumentList";
import AnalysisModal from "@/components/history/AnalysisModal";
import { useHistoryStore } from "@/store/historyStore";

const { Title, Text } = Typography;

// Temporary mock data - will be removed when backend is integrated
const mockData = [
  {
    id: 1,
    fileName: "Environmental_Policy_2025.pdf",
    uploadDateTime: "2025-05-11 14:30",
    status: "Analyzed",
    type: "Environmental Policy"
  },
  {
    id: 2,
    fileName: "Social_Policy_Draft.pdf",
    uploadDateTime: "2025-05-10 09:15",
    status: "Analyzed",
    type: "Social Policy"
  },
  {
    id: 3,
    fileName: "Economic_Guidelines.pdf",
    uploadDateTime: "2025-05-09 16:45",
    status: "Analyzed",
    type: "Economic Policy"
  }
];

const HistoryPage: React.FC = () => {
  const { 
    documents,
    selectedDocument,
    isModalVisible,
    setDocuments,
    setSelectedDocument,
    setModalVisible
  } = useHistoryStore();

  // Initialize with mock data - will be replaced with API call
  React.useEffect(() => {
    if (documents.length === 0) {
      setDocuments(mockData);
    }
  }, [documents.length, setDocuments]);

  const handleDocumentClick = (doc: typeof mockData[0]) => {
    setSelectedDocument(doc);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDocument(null);
  };

  return (
    <div className="p-4">
      <Title level={2}>Upload History</Title>
      <Text type="secondary" className="mb-4 block">
        View and analyze your previously uploaded documents
      </Text>

      <DocumentList 
        documents={documents} 
        onDocumentClick={handleDocumentClick}
      />

      <AnalysisModal
        document={selectedDocument}
        visible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default HistoryPage;

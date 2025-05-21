import { useState } from "react";
import { Upload, Progress, Typography, Card, Button, Modal, message } from "antd";
import type { UploadProps } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadDocument } from "@/services/documentService";
import { useDocumentStore } from "@/store/documentStore";
import AssessmentModal from "@/components/AssessmentModal";
import DocumentTypeSelection from "@/components/DocumentTypeSelection";

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSummarize, setShowSummarize] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSummaryRequested = useDocumentStore((state) => state.setSummaryRequested);
  const setUploadedFileName = useDocumentStore((state) => state.setUploadedFileName);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setSummaryRequested(false);
    setSelectedDocType(null);
    setError(null);

    try {
      const res = await uploadDocument(file);
      setFileName(res.fileName);
      setUploadedFileName(res.fileName);
      setShowSummarize(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSummarizeClick = () => {
    if (fileName && selectedDocType) {
      setIsModalOpen(true);
    } else {
      message.warning('Please select a document type first');
    }
  };

  const proceedWithSummarization = () => {
    if (selectedDocType) {
      setSummaryRequested(true);
      setIsModalOpen(false);
      const summarySection = document.getElementById("summary-section");
      if (summarySection) {
        summarySection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setFileName(null);
    setShowSummarize(false);
    setUploadProgress(0);
    setSelectedDocType(null);
    setSummaryRequested(false);
    setError(null);
  };

  const props: UploadProps = {
    multiple: false,
    beforeUpload: (file) => {
      setUploadedFile(file);
      handleUpload(file);
      return false;
    },
    showUploadList: false,
    accept: ".pdf,.doc,.docx,.txt",
  };

  return (
    <Card className="shadow-md rounded-lg mb-8">
      <div className="text-center">
        <Title level={3} style={{ margin: 0, color: "#1f2937" }}>
          Document Analyzer
        </Title>
        <Paragraph type="secondary">
          Upload your document and select its type to begin analysis
        </Paragraph>
      </div>

      <Dragger {...props} style={{ padding: 16, width: "100%" }}>
        <CloudUploadOutlined
          style={{
            fontSize: "2.5rem",
            color: "#9ca3af",
            marginBottom: "0.5rem",
          }}
        />
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint text-gray-500 text-sm">
          Supported formats: .pdf, .doc, .docx, .txt
        </p>
      </Dragger>

      {uploadedFile && (
        <div className="text-center mt-4">
          <Text strong>Uploaded File:</Text>{" "}
          <Text code>{uploadedFile.name}</Text>
        </div>
      )}

      {isUploading && (
        <div className="w-full mt-4">
          <Progress percent={uploadProgress} status="active" />
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          <Text type="danger">{error}</Text>
        </div>
      )}

      {!isUploading && uploadedFile && showSummarize && (
        <div className="w-full mt-4">
          <DocumentTypeSelection
            onTypeSelect={setSelectedDocType}
            disabled={isUploading}
          />
          {selectedDocType && (
            <div className="text-center mt-4">
              <Button
                type="primary"
                onClick={handleSummarizeClick}
                size="large"
              >
                Proceed with Analysis
              </Button>
            </div>
          )}
        </div>
      )}

      <AssessmentModal
        visible={isModalOpen}
        onClose={proceedWithSummarization}
        documentName={uploadedFile?.name || ""}
        documentType={selectedDocType || ""}
      />
    </Card>
  );
}

import { useEffect, useState } from "react";
import {
  Upload,
  Progress,
  Typography,
  Card,
  Button,
  Space,
  Modal,
  message,
  Select,
} from "antd";
import type { UploadProps } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getDocumentTypes, uploadDocument } from "@/services/documentService";
import { useDocumentStore } from "@/store/documentStore";
import AssessmentModal from "@/components/AssessmentModal";
import { DocumentType } from "@/model/DocumentModels";

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSummarize, setShowSummarize] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  const setSummaryRequested = useDocumentStore(
    (state) => state.setSummaryRequested
  );
  const setUploadedFileName = useDocumentStore(
    (state) => state.setUploadedFileName
  );

  useEffect(() => {
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    try {
      const types = await getDocumentTypes();
      setDocumentTypes(types);
    } catch (error) {
      console.error("Failed to load document types:", error);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setSummaryRequested(false);
    setSelectedDocType(null);

    try {
      const res = await uploadDocument(file);
      setFileName(res.fileName);
      setUploadedFileName(res.fileName);

      if (res.warning) {
        Modal.confirm({
          title: "Warning",
          content: res.warning + " Do you want to continue?",
          onOk: () => setShowSummarize(true),
          onCancel: () => resetUpload(),
        });
      } else {
        setShowSummarize(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const proceedWithSummarization = () => {
    setSummaryRequested(true);
    const summarySection = document.getElementById("summary-section");
    if (summarySection) {
      summarySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setFileName(null);
    setShowSummarize(false);
    setUploadProgress(0);
    setSelectedDocType(null);
    setSummaryRequested(false);
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
    <Card
      className="shadow-md rounded-lg mb-8"
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        },
      }}
    >
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
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
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
        <>
          <div className="w-full max-w-sm mt-4">
            <Text strong>Select Document Type:</Text>
            <Select
              placeholder="Choose document type"
              style={{ width: "100%", marginTop: 8 }}
              onChange={(value) => {
                const selected =
                  documentTypes.find((dt) => dt.id === value) || null;
                setSelectedDocType(selected);
              }}
              value={selectedDocType?.id}
            >
              {documentTypes.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>
          {selectedDocType && (
            <>
              <AssessmentModal documentType={selectedDocType} />
              <Space style={{ marginTop: 24 }}>
                <Button type="primary" onClick={proceedWithSummarization}>
                  Proceed with Analysis
                </Button>
              </Space>
            </>
          )}
        </>
      )}
    </Card>
  );
}

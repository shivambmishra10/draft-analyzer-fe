import { useState } from "react";
import {
  Upload,
  Progress,
  Typography,
  Card,
  Button,
  Space,
  Modal,
  message,
} from "antd";
import type { UploadProps } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadDocument } from "@/services/documentService";
import { useSessionStore } from "@/store/sessionStore";

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSummarize, setShowSummarize] = useState(false);

  const setSummaryRequested = useSessionStore(
    (state) => state.setSummaryRequested
  );
  const setUploadedFileName = useSessionStore(
    (state) => state.setUploadedFileName
  );

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setSummaryRequested(false);

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
      message.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSummarizeClick = () => {
    if (fileName) {
      setSummaryRequested(true);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setFileName(null);
    setShowSummarize(false);
    setUploadProgress(0);
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
          Document Summarizer
        </Title>
        <Paragraph type="secondary">
          Drag and drop your policy or document file here, or click to browse.
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

      {!isUploading && uploadedFile && showSummarize && (
        <Space style={{ marginTop: 24 }}>
          <Button type="primary" onClick={handleSummarizeClick}>
            Summarize
          </Button>
        </Space>
      )}
    </Card>
  );
}

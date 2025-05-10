import { useState } from "react";
import { Upload, Progress, Typography, Card, Button, Space } from "antd";
import type { UploadProps } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useSessionStore } from "@/store/sessionStore";

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const setSummaryRequested = useSessionStore((state) => state.setSummaryRequested);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setSummaryRequested(false);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSummarizeClick = () => {
    setSummaryRequested(true);
  };

  const props: UploadProps = {
    multiple: false,
    beforeUpload: (file) => {
      setUploadedFile(file);
      simulateUpload(file);
      return false; // prevent auto-upload
    },
    showUploadList: false,
    accept: ".pdf,.doc,.docx,.txt",
  };

  return (
    <Card
      className="shadow-md rounded-lg mb-8"
      bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
    >
      <div className="text-center">
        <Title level={3} style={{ margin: 0, color: "#1f2937" }}>Document Summarizer</Title>
        <Paragraph type="secondary">
          Drag and drop your policy or document file here, or click to browse.
        </Paragraph>
      </div>

      <Dragger {...props} style={{ padding: 16, width: "100%" }}>
        <CloudUploadOutlined style={{ fontSize: '2.5rem', color: '#9ca3af', marginBottom: '0.5rem' }} />
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

      {!isUploading && uploadedFile && (
        <Space style={{ marginTop: 24 }}>
          <Button type="primary" onClick={handleSummarizeClick}>
            Summarize
          </Button>
        </Space>
      )}
    </Card>
  );
}

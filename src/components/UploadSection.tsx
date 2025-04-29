import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Upload, Progress, Typography, Card, Button } from "antd";
import type { UploadProps } from "antd";

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

export default function UploadSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
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
        <UploadCloud className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint text-gray-500 text-sm">
          Supported formats: .pdf, .doc, .docx, .txt
        </p>
      </Dragger>

      {uploadedFile && (
        <div className="text-center mt-4">
          <Text strong>Uploaded File:</Text>{" "}
          <Text code>{uploadedFile.name}</Text>

          {!isUploading && (
            <div className="mt-2">
              <Button
                type="primary"
                onClick={() => {
                  setUploadedFile(null);
                  setUploadProgress(0);
                }}
              >
                Upload Different File
              </Button>
            </div>
          )}
        </div>
      )}

      {isUploading && (
        <div className="w-full mt-4">
          <Progress percent={uploadProgress} status="active" />
        </div>
      )}
    </Card>
  );
}

import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Spin, message, Space } from "antd";
import { CheckCircleTwoTone, FileTextOutlined, DownloadOutlined } from "@ant-design/icons";
import { fetchSummary } from "@/services/documentService";
import { useSessionStore } from "@/store/sessionStore";
import { SummaryResponse } from "@/model/documentModels";

const { Title, Paragraph } = Typography;

const InsightSection: React.FC = () => {
  const fileName = useSessionStore((state) => state.uploadedFileName);
  const summaryRequested = useSessionStore((state) => state.summaryRequested);

  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const getSummary = async () => {
      if (!summaryRequested || !fileName) return;

      setLoading(true);
      try {
        const response = await fetchSummary({ fileName });
        setSummaryData(response);
      } catch (err) {
        message.error("Failed to fetch summary.");
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [summaryRequested, fileName]);

  return (
    <Card style={{ marginTop: 32 }} variant="borderless">
      <Title level={3} style={{ textAlign: "center" }}>
        Get Your Document Insights
      </Title>
      <Paragraph
        type="secondary"
        style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 24px" }}
      >
        Easily view the summary of your uploaded policy documents.
      </Paragraph>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spin tip="Generating summary..." size="large" />
        </div>
      ) : summaryData ? (
        <div style={{ marginTop: 24 }}>
          <Title level={4}>
            <FileTextOutlined style={{ marginRight: 8 }} />
            Document Summary
          </Title>

          {summaryData.summaryPoints && (
            <Space direction="vertical" style={{ width: "100%", padding: "8px 0" }}>
              {summaryData.summaryPoints.map((point, index) => (
                <div key={index} style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginTop: 4 }} />
                  <Paragraph style={{ margin: 0 }}>{point}</Paragraph>
                </div>
              ))}
            </Space>
          )}

          <Card
            size="small"
            style={{
              marginTop: 24,
              background: "#f9f9f9",
              border: "1px solid #f0f0f0",
              borderRadius: 8,
            }}
          >
            <Paragraph style={{ marginBottom: 0, whiteSpace: "pre-wrap" }}>
              {summaryData.summaryText}
            </Paragraph>
          </Card>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <Button icon={<DownloadOutlined />} type="primary" ghost>
              Download Summary
            </Button>
          </div>
        </div>
      ) : (
        <Paragraph style={{ textAlign: "center", marginTop: 32 }}>
          Upload a document and click summarize to view the summary here.
        </Paragraph>
      )}
    </Card>
  );
};

export default InsightSection;

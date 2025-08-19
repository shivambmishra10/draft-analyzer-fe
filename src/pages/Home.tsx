import React from "react";
import { Button, Typography, Row, Col, Card, Steps } from "antd";
import { FileTextOutlined, UploadOutlined, CheckCircleOutlined, LineChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Step } = Steps;
import docImage from '@/assets/undraw_ai-agent_pdkp.svg';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Top Right Login */}
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>

      {/* Hero Section */}
      <Row align="middle">
        <Col xs={24} md={14}>
          <Title level={1} style={{ fontSize: "2.5rem", marginBottom: 16 }}>
            Welcome to Policy Document Analyzer
          </Title>
          <Paragraph style={{ fontSize: "1.2rem", color: "#555" }}>
            A smart platform that helps government officials and analysts upload, summarize, evaluate, and analyze policy documents quickly and effectively using advanced AI techniques.
          </Paragraph>
          <Paragraph style={{ fontSize: "1rem", marginTop: "1rem", color: "#666" }}>
            Use our intuitive interface to upload documents, receive AI-generated summaries, score impact, and visualize key policy elements in beautiful charts and evaluation reports.
          </Paragraph>
          <Button type="primary" size="large" style={{ marginTop: 24 }} onClick={() => navigate("/analyze")}>
            Start Analyzing
          </Button>
        </Col>
        <Col xs={24} md={10}>
          <img
            src={docImage}
            alt="Document Analysis"
            style={{ width: "100%", maxHeight: "360px", objectFit: "contain" }}
          />

        </Col>
      </Row>

      {/* How It Works Section */}
      <div style={{ marginTop: 64 }}>
        <Title level={2} style={{ textAlign: "center" }}>
          How It Works
        </Title>
        <Steps
          direction="horizontal"
          responsive
          size="default"
          current={4}
          style={{ maxWidth: 900, margin: "2rem auto" }}
        >
          <Step title="Upload" icon={<UploadOutlined />} description="Upload your policy or government document." />
          <Step title="Summarize" icon={<FileTextOutlined />} description="AI generates concise summaries of key content." />
          <Step title="Evaluate" icon={<CheckCircleOutlined />} description="View responses to predefined assessment prompts." />
          <Step title="Analyze" icon={<LineChartOutlined />} description="Score and visualize document performance." />
        </Steps>
      </div>

      {/* Feature Cards */}
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: 48 }}>
        <Col xs={24} sm={12} md={6}>
          <Card title="AI Summary" variant="borderless" hoverable>
            Instantly generate readable summaries of long policy documents.
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Smart Evaluation" variant="borderless" hoverable>
            Evaluate the document using customized prompts and scoring.
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Visual Insights" variant="borderless" hoverable>
            Interactive charts help you assess clarity, implementation, and impact.
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card title="Download Reports" variant="borderless" hoverable>
            Save and download summaries and reports in PDF format.
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;

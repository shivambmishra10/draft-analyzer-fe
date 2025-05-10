import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const InsightSection: React.FC = () => {
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

      <div style={{ marginTop: 24 }}>
        <Title level={4}>Document Summary</Title>
        <Paragraph>
          <ul>
            <li>Reducing carbon emissions by 40% by 2035</li>
            <li>
              Implementing green building standards for all new construction
            </li>
            <li>
              Expanding public transportation networks to reduce car dependency
            </li>
            <li>
              Creating community green spaces within 10-minute walking distance
              of all residential areas
            </li>
            <li>Developing water conservation strategies and infrastructure</li>
          </ul>
        </Paragraph>
        <Paragraph>
          The policy emphasizes community involvement in planning processes and
          equitable distribution of environmental benefits across all
          neighborhoods. Implementation will occur in three phases, with the
          initial focus on regulatory framework development, followed by
          infrastructure investment, and concluding with monitoring and
          refinement.
        </Paragraph>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "16px",
          }}
        >
          <Button type="primary" ghost>
            ⬇️ Download Summary
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InsightSection;

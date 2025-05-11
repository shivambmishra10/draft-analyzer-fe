import React, { useEffect, useState } from "react";
import { Card, Typography, Tag, Space, Spin, message } from "antd";
import { EvaluationItem } from "@/model/EvaluationModels";
import { fetchPromptEvaluations } from "@/services/documentService";
import { useDocumentStore } from "@/store/documentStore";

const { Title, Paragraph } = Typography;

const getScoreTagColor = (score: number) => {
  if (score >= 8) return "green";
  if (score >= 6) return "orange";
  return "red";
};

const PromptEvaluation: React.FC = () => {
  const fileName = useDocumentStore((state) => state.uploadedFileName);
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!fileName) return;
      setLoading(true);
      try {
        const data = await fetchPromptEvaluations({ fileName });
        setEvaluations(data.evaluations);
      } catch (err) {
        message.error("Failed to fetch evaluations.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fileName]);

  return (
    <Card style={{ marginTop: 32 }} variant="borderless">
      <Title level={3} style={{ textAlign: "center" }}>
        Evaluation by Prompts
      </Title>
      <Paragraph
        type="secondary"
        style={{ textAlign: "center", margin: "0 auto 24px" }}
      >
        View the answers and score for your uploaded policy documents using the
        predefined question.
      </Paragraph>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spin tip="Loading evaluations..." size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {evaluations.map((evalItem, index) => (
            <Card
              type="inner"
              key={index}
              style={{
                backgroundColor: "#fafafa",
                borderLeft: "4px solid #1890ff",
              }}
            >
              <Paragraph strong style={{ color: "#1890ff", marginBottom: 4 }}>
                {evalItem.question}
              </Paragraph>
              <Paragraph>{evalItem.answer}</Paragraph>
              <Tag
                color={getScoreTagColor(evalItem.score)}
                style={{ fontSize: "14px" }}
              >
                {evalItem.score}/10
              </Tag>
            </Card>
          ))}
        </Space>
      )}
    </Card>
  );
};

export default PromptEvaluation;

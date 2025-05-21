import { useState, useEffect } from "react";
import { Modal, Typography, Spin, Card, Collapse } from "antd";
import { getAssessmentsByDocumentType } from "@/services/assessmentService";
import { type Assessment } from "@/model/DocumentTypes";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface AssessmentModalProps {
  visible: boolean;
  onClose: () => void;
  documentName: string;
  documentType: string;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({
  visible,
  onClose,
  documentName,
  documentType,
}) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible && documentType) {
      loadAssessments(documentType);
    }
  }, [visible, documentType]);

  const loadAssessments = async (docType: string) => {
    try {
      setLoading(true);
      const data = await getAssessmentsByDocumentType(docType);
      setAssessments(data);
    } catch (error) {
      console.error("Failed to load assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Assessment Framework"
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      width={800}
    >
      <div style={{ marginBottom: 24 }}>
        <Text>Document Name: </Text>
        <Text strong>{documentName}</Text>
        <br />
        <Text>Document Type: </Text>
        <Text strong style={{ textTransform: 'capitalize' }}>{documentType}</Text>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Collapse defaultActiveKey={['0']}>
          {assessments.map((assessment, index) => (
            <Panel 
              header={<Title level={5}>{assessment.title}</Title>}
              key={index}
            >
              <Paragraph>{assessment.description}</Paragraph>
              <Card title="Evaluation Prompts" style={{ marginTop: 16 }}>
                {assessment.prompts?.map((prompt, promptIndex) => (
                  <div key={promptIndex} style={{ marginBottom: 16 }}>
                    <Text strong>{prompt.question}</Text>
                    <br />
                    <Text type="secondary">Category: {prompt.category}</Text>
                    {prompt.isRequired && (
                      <Text type="danger" style={{ marginLeft: 8 }}>
                        (Required)
                      </Text>
                    )}
                  </div>
                ))}
              </Card>
            </Panel>
          ))}
        </Collapse>
      )}
    </Modal>
  );
};

export default AssessmentModal;

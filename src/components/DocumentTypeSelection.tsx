import React, { useState, useEffect } from 'react';
import { Select, Card, Typography, List, Modal, Spin, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DocumentType, Assessment, AssessmentPrompt } from '@/model/DocumentTypes';
import { getDocumentTypes, getAssessmentsByDocumentType, getAssessmentPrompts } from '@/services/assessmentService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface DocumentTypeSelectionProps {
  onTypeSelect: (typeId: string | null) => void;
  disabled?: boolean;
}

export default function DocumentTypeSelection({ onTypeSelect, disabled = false }: DocumentTypeSelectionProps) {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [prompts, setPrompts] = useState<AssessmentPrompt[]>([]);

  useEffect(() => {
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    try {
      const types = await getDocumentTypes();
      setDocumentTypes(types);
    } catch (error) {
      console.error('Failed to load document types:', error);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const loadAssessments = async (typeId: string) => {
    setIsLoadingAssessments(true);
    try {
      const typeAssessments = await getAssessmentsByDocumentType(typeId);
      setAssessments(typeAssessments);
    } catch (error) {
      console.error('Failed to load assessments:', error);
    } finally {
      setIsLoadingAssessments(false);
    }
  };

  const loadPrompts = async (assessmentId: number) => {
    try {
      const assessmentPrompts = await getAssessmentPrompts(assessmentId);
      setPrompts(assessmentPrompts);
    } catch (error) {
      console.error('Failed to load prompts:', error);
    }
  };

  const handleTypeChange = async (typeId: string) => {
    setSelectedType(typeId);
    onTypeSelect(typeId);
    await loadAssessments(typeId);
  };

  const handleAssessmentClick = async (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    await loadPrompts(assessment.id);
    setShowPreview(true);
  };

  const renderAssessmentsList = () => (
    <List
      dataSource={assessments}
      loading={isLoadingAssessments}
      renderItem={(assessment) => (
        <List.Item>
          <Card 
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={() => handleAssessmentClick(assessment)}
          >
            <Title level={5}>{assessment.title}</Title>
            <Paragraph>{assessment.description}</Paragraph>
            <Button type="link" icon={<InfoCircleOutlined />}>
              View Prompts
            </Button>
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Select Document Type:</Text>
        <Select
          placeholder="Choose document type"
          style={{ width: '100%', marginTop: 8 }}
          onChange={handleTypeChange}
          value={selectedType}
          disabled={disabled || isLoadingTypes}
          loading={isLoadingTypes}
        >
          {documentTypes.map((type) => (
            <Option key={type.id} value={type.id}>
              {type.name}
            </Option>
          ))}
        </Select>
      </div>

      {selectedType && !isLoadingTypes && (
        <div style={{ marginTop: 16 }}>
          <Title level={4}>Available Assessments</Title>
          {renderAssessmentsList()}
        </div>
      )}

      <Modal
        title={selectedAssessment?.title}
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={null}
        width={800}
      >
        {selectedAssessment && (
          <div>
            <Paragraph>{selectedAssessment.description}</Paragraph>
            <Title level={5}>Evaluation Prompts</Title>
            <List
              dataSource={prompts}
              renderItem={(prompt) => (
                <List.Item>
                  <Card style={{ width: '100%' }}>
                    <Title level={5}>{prompt.question}</Title>
                    <Text type="secondary">Category: {prompt.category}</Text>
                    {prompt.isRequired && (
                      <Text type="danger" style={{ marginLeft: 8 }}>
                        Required
                      </Text>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

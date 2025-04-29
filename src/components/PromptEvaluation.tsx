import React from 'react';
import { Card, Typography, Tag, Button, Space } from 'antd';

const { Title, Paragraph } = Typography;

const evaluations = [
  {
    question: 'What are the main policy objectives?',
    answer:
      'The main objectives are carbon emission reduction, green building implementation, public transit expansion, community green space creation, and water conservation.',
    score: 9.5,
  },
  {
    question: 'How does this policy address equity concerns?',
    answer:
      'The policy explicitly addresses equity through mandating equal distribution of environmental benefits across neighborhoods and requiring community involvement in planning processes, though specifics on implementation are somewhat limited.',
    score: 7.8,
  },
  {
    question: 'What is the implementation timeline?',
    answer:
      'Implementation occurs in three phases: regulatory framework development (years 1-2), infrastructure investment (years 3-7), and monitoring/refinement (years 8-10).',
    score: 9.0,
  },
  {
    question: 'What funding mechanisms are proposed?',
    answer:
      'The document lacks clear funding mechanisms beyond mentioning public-private partnerships and potential federal grants, with no specific budget allocations or revenue sources identified.',
    score: 5.2,
  },
];

// Function to determine tag color based on score
const getScoreTagColor = (score: number) => {
  if (score >= 8) return 'green';
  if (score >= 6) return 'orange';
  return 'red';
};

const PromptEvaluation: React.FC = () => {
  return (
    <Card style={{ marginTop: 32 }} variant='borderless'>
        <Title level={3} style={{ textAlign: 'center' }}>Evaluation by Prompts</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {evaluations.map((evalItem, index) => (
          <Card
            type="inner"
            key={index}
            style={{ backgroundColor: '#fafafa', borderLeft: '4px solid #1890ff' }}
          >
            <Paragraph strong style={{ color: '#1890ff', marginBottom: 4 }}>
              {evalItem.question}
            </Paragraph>
            <Paragraph>{evalItem.answer}</Paragraph>
            <Tag color={getScoreTagColor(evalItem.score)} style={{ fontSize: '14px' }}>
              {evalItem.score}/10
            </Tag>
          </Card>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '16px' }}>
          <Button type="primary" ghost>
            Download Results
          </Button>
          <Button type="primary">Save to Database</Button>
        </div>
      </Space>
    </Card>
  );
};

export default PromptEvaluation;


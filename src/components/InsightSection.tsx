import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { Button, Card, Typography, Row, Col, Collapse, Space } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const InsightSection: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string | string[]>([]);

  const handleToggle = (key: string) => {
    setActivePanel((prev) =>
      Array.isArray(prev) && prev.includes(key) ? [] : [key]
    );
  };

  const pieData = [
    { name: 'Objectives', value: 25 },
    { name: 'Implementation', value: 20 },
    { name: 'Clarity', value: 20 },
    { name: 'Equity', value: 15 },
    { name: 'Funding', value: 20 },
  ];

  const barData = [
    { name: 'Environmental', score: 88 },
    { name: 'Economic', score: 65 },
    { name: 'Social', score: 78 },
    { name: 'Governance', score: 80 },
    { name: 'Technology', score: 70 },
  ];

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A9A9F5'];

  return (
    <Card style={{ marginTop: 32 }} variant='borderless'>
      <Title level={3} style={{ textAlign: 'center' }}>Get Your Document Insights</Title>
      <Paragraph style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 24px' }}>
        Easily summarize and score your policy documents with just a few clicks.
      </Paragraph>

      <Space direction="horizontal" style={{ justifyContent: 'center', width: '100%', marginBottom: 24 }}>
        <Button type="primary" onClick={() => handleToggle('summary')}>Summarize</Button>
        <Button type="default" onClick={() => handleToggle('score')}>📊 View Scores</Button>
      </Space>

      <Collapse
        activeKey={activePanel}
        expandIconPosition="end"
        ghost
        accordion
        style={{ marginBottom: 24 }}
      >
        {/* Summary Panel */}
        <Panel
          header="Document Summary"
          key="summary"
          extra={<UpOutlined rotate={activePanel === 'summary' ? 180 : 0} />}
        >
          <Paragraph>
            <ul>
              <li>Reducing carbon emissions by 40% by 2035</li>
              <li>Implementing green building standards for all new construction</li>
              <li>Expanding public transportation networks to reduce car dependency</li>
              <li>Creating community green spaces within 10-minute walking distance of all residential areas</li>
              <li>Developing water conservation strategies and infrastructure</li>
            </ul>
          </Paragraph>
          <Paragraph>
            The policy emphasizes community involvement in planning processes and equitable distribution of
            environmental benefits across all neighborhoods. Implementation will occur in three phases, with the
            initial focus on regulatory framework development, followed by infrastructure investment, and concluding
            with monitoring and refinement.
          </Paragraph>
          <Space style={{ marginTop: 16 }}>
            <Button>⬇️ Download Summary</Button>
            <Button type="primary">💾 Save to Database</Button>
          </Space>
        </Panel>

        {/* Score Panel */}
        <Panel
          header="Document Score Analysis"
          key="score"
          extra={<UpOutlined rotate={activePanel === 'score' ? 180 : 0} />}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>8.4</Text>
                <Paragraph>Overall Score</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>93%</Text>
                <Paragraph>Clarity Rating</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>87%</Text>
                <Paragraph>Implementation Detail</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>76%</Text>
                <Paragraph>Stakeholder Engagement</Paragraph>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
            <Col xs={24} md={12}>
              <Card title="Policy Element Scores">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Performance by Category">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default InsightSection;

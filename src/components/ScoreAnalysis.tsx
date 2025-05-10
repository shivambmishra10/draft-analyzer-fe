import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const { Paragraph, Text } = Typography;

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

const ScoreAnalysis: React.FC = () => (
  <div style={{ marginTop: 32 }}>
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
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '16px' }}>
        <Button type="primary" ghost>
        Download Results
        </Button>
    </div>
  </div>
);

export default ScoreAnalysis;

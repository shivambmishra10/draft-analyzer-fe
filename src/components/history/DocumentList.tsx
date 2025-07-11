import React from 'react';
import { List, Card, Typography, Tag, Space } from 'antd';
import { FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import { type HistoryDocument } from '@/store/historyStore';

const { Text } = Typography;

interface DocumentListProps {
  documents: HistoryDocument[];
  onDocumentClick: (doc: HistoryDocument) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDocumentClick }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={documents}
      className="max-w-4xl mx-auto"
      renderItem={(item) => (
        <List.Item>
          <Card 
            hoverable
            onClick={() => onDocumentClick(item)}
            className="w-full mb-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileTextOutlined className="text-xl text-blue-500" />
                </div>
                <div>
                  <Text strong className="text-lg block">{item.fileName}</Text>
                  <Space className="mt-1">
                    <CalendarOutlined className="text-gray-400" />
                    <Text type="secondary">{item.uploadDateTime}</Text>
                  </Space>
                </div>
              </div>
              <Space className="flex items-center">
                <Tag color="blue" className="text-sm">{item.type}</Tag>
                <Tag color="green" className="text-sm">{item.status}</Tag>
              </Space>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default DocumentList;

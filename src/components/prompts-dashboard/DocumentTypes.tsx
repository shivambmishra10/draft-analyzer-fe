import { Table, Button, Input, Typography, Popconfirm, message } from 'antd';
import { useState } from 'react';
import DocumentTypeForm from './DocumentTypeForm';

const { Title, Text } = Typography;

const initialData = [
  {
    doc_type_id: 1,
    doc_type_name: 'Financial Report Q1',
    description: 'Quarterly financial performance review.',
    created_by: 'admin',
    created_on: '2025-05-10 10:30:00',
  },
  {
    doc_type_id: 2,
    doc_type_name: 'Employee Performance Review',
    description: 'Annual employee assessment document.',
    created_by: 'admin',
    created_on: '2025-04-20 14:45:00',
  },
];

const criteriaOptions = [
  'Revenue Growth Analysis',
  'Profit Margin Calculation',
  'Goal Achievement',
  'Team Collaboration Skills',
];

const DocumentTypes = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const showAddModal = () => {
    setFormMode('add');
    setSelectedDoc(null);
    setSelectedCriteria([]);
    setModalVisible(true);
  };

  const handleRowClick = (record: any) => {
    setFormMode('edit');
    setSelectedDoc(record);
    setSelectedCriteria(['Goal Achievement']); // simulate fetching criteria
    setModalVisible(true);
  };

  const handleSubmit = (doc: any, criteria: string[]) => {
    if (formMode === 'add') {
      const newDoc = {
        ...doc,
        doc_type_id: Math.max(...data.map(d => d.doc_type_id)) + 1,
        created_by: 'admin',
        created_on: new Date().toISOString(),
      };
      setData([...data, newDoc]);
    } else {
      const updatedData = data.map((d) =>
        d.doc_type_id === doc.doc_type_id ? { ...d, ...doc } : d
      );
      setData(updatedData);
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter(doc => doc.doc_type_id !== id));
    message.success('Document type deleted');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'doc_type_name',
      key: 'doc_type_name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Created On',
      dataIndex: 'created_on',
      key: 'created_on',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-4">
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              handleRowClick(record);
            }}
            className="text-blue-600 px-0"
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this document type?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.doc_type_id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              className="px-0"
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Policy Dashboard</Title>
      <Text type="secondary" className="mb-4 block">
        Manage Document Types
      </Text>

      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search document types..."
          className="w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={showAddModal}>
          Add New Document Type
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data.filter(d =>
          d.doc_type_name.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="doc_type_id"
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <DocumentTypeForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        mode={formMode}
        initialData={selectedDoc}
        initialCriteria={selectedCriteria}
        criteriaOptions={criteriaOptions}
      />
    </div>
  );
};

export default DocumentTypes;

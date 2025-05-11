import React from 'react';
import { 
  Table, 
  Button, 
  Typography, 
  Space, 
  Tag, 
  Modal, 
  Form,
  message 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { usePromptStore, type Prompt } from '@/store/promptStore';
import PromptForm from '@/components/PromptForm';

const { Title } = Typography;

const PromptDashboard: React.FC = () => {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const { 
    prompts,
    isAddModalVisible,
    isEditModalVisible,
    selectedPrompt,
    addPrompt,
    updatePrompt,
    deletePrompt,
    setAddModalVisible,
    setEditModalVisible,
    setSelectedPrompt
  } = usePromptStore();

  const handleAdd = () => {
    addForm.validateFields()
      .then(values => {
        addPrompt(values);
        setAddModalVisible(false);
        addForm.resetFields();
        message.success('Prompt added successfully');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEdit = () => {
    if (!selectedPrompt) return;
    
    editForm.validateFields()
      .then(values => {
        updatePrompt(selectedPrompt.id, values);
        setEditModalVisible(false);
        setSelectedPrompt(null);
        message.success('Prompt updated successfully');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const showEditModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setEditModalVisible(true);
    editForm.setFieldsValue(prompt);
  };

  const handleDelete = (prompt: Prompt) => {
    const { confirm } = Modal;
    confirm({
      title: 'Delete Prompt',
      content: `Are you sure you want to delete the prompt "${prompt.question}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve, reject) => {
          try {
            deletePrompt(prompt.id);
            message.success('Prompt deleted successfully');
            resolve(true);
          } catch (error) {
            message.error('Failed to delete prompt');
            console.error('Delete failed:', error);
            reject(error);
          }
        });
      },
    });
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Required',
      dataIndex: 'isRequired',
      key: 'isRequired',
      width: '10%',
      render: (isRequired: boolean) => (
        <Tag color={isRequired ? 'green' : 'default'}>
          {isRequired ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: '15%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: unknown, record: Prompt) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Prompt Dashboard</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAddModalVisible(true)}
        >
          Add Prompt
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={prompts}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Prompt"
        open={isAddModalVisible}
        onOk={handleAdd}
        onCancel={() => {
          setAddModalVisible(false);
          addForm.resetFields();
        }}
        width={600}
      >
        <PromptForm form={addForm} />
      </Modal>

      <Modal
        title="Edit Prompt"
        open={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedPrompt(null);
        }}
        width={600}
      >
        <PromptForm form={editForm} initialValues={selectedPrompt || undefined} />
      </Modal>
    </div>
  );
};

export default PromptDashboard;

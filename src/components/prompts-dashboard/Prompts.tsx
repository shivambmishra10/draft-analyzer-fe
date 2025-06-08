import {
  Table,
  Button,
  Input,
  Typography,
  Popconfirm,
  message,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import PromptsForm from './PromptsForm';
import {
  getPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from '@/services/prompt-dashboard/promptService';
import { Prompt } from '@/model/PromptModel';
import { removeEmptyFields } from '@/utils/helpers';

const { Title, Text } = Typography;

const Prompts = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const prompts = await getPrompts();
      setData(prompts);
    } catch (error) {
      message.error('Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setFormMode('add');
    setSelectedPrompt(null);
    setModalVisible(true);
  };

  const handleRowClick = (record: Prompt) => {
    setFormMode('edit');
    setSelectedPrompt(record);
    setModalVisible(true);
  };

  const handleSubmit = async (prompt: Prompt) => {
    const cleanedPrompt = removeEmptyFields(prompt);
    try {
      if (formMode === 'add') {
        const created = await createPrompt(cleanedPrompt);
        setData((prev) => [...prev, created]);
        message.success('Prompt created');
      } else {
        const updated = await updatePrompt(cleanedPrompt);
        setData((prev) =>
          prev.map((d) => (d.prompt_id === updated.prompt_id ? updated : d))
        );
        message.success('Prompt updated');
      }
    } catch (err) {
      message.error('Operation failed');
    } finally {
      setModalVisible(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePrompt(id);
      setData((prev) => prev.filter((doc) => doc.prompt_id !== id));
      message.success('Prompt deleted');
    } catch (err) {
      message.error('Failed to delete prompt');
    }
  };

  const columns = [
    {
      title: 'Criteria',
      dataIndex: 'criteria',
      key: 'criteria',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
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
      render: (_: any, record: Prompt) => (
        <div className="flex gap-4">
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(record);
            }}
            className="text-blue-600 px-0"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this prompt?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.prompt_id!);
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
      <Title level={2}>Prompt Management</Title>
      <Text type="secondary" className="mb-4 block">
        Manage Prompt Questions
      </Text>

      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search prompts..."
          className="w-1/2 mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={showAddModal}>
          Add Prompt
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data.filter((d) =>
            d.criteria.toLowerCase().includes(search.toLowerCase())
          )}
          rowKey="prompt_id"
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      )}

      <PromptsForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        mode={formMode}
        initialData={selectedPrompt ?? undefined}
      />
    </div>
  );
};

export default Prompts;
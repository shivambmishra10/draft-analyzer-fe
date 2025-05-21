import React, { useState } from 'react';
import { Button, Collapse, Table, Tag, Input, Space, Typography, Modal, Form, message } from 'antd';
import { usePromptStore, Prompt } from '@/store/promptStore';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import PromptForm from '../components/PromptForm';

const { Panel } = Collapse;
const { Title } = Typography;

const categories = ['Policy Review', 'Equity', 'Implementation', 'Financial', 'Objectives'];

const PromptDashboard: React.FC = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchMap, setSearchMap] = useState<{ [category: string]: string }>({});
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedAssessmentType, setSelectedAssessmentType] = useState<string | null>(null);


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
    setSelectedPrompt,
  } = usePromptStore();

  const handleAdd = () => {
    addForm
      .validateFields()
      .then((values) => {
        addPrompt(values);
        setAddModalVisible(false);
        addForm.resetFields();
        message.success('Prompt added successfully');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEdit = () => {
    if (!selectedPrompt) return;
    editForm
      .validateFields()
      .then((values) => {
        updatePrompt(selectedPrompt.id, values);
        setEditModalVisible(false);
        setSelectedPrompt(null);
        message.success('Prompt updated successfully');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (prompt: Prompt) => {
    Modal.confirm({
      title: 'Delete Prompt',
      content: `Are you sure you want to delete the prompt "${prompt.question}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        try {
          deletePrompt(prompt.id);
          message.success('Prompt deleted successfully');
        } catch (error) {
          message.error('Failed to delete prompt');
          console.error('Delete failed:', error);
        }
      },
    });
  };

  const showEditModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setEditModalVisible(true);
    editForm.setFieldsValue(prompt);
  };

  const handleEditCategory = (category: string) => {
    Modal.confirm({
      title: 'Edit Category',
      content: `Are you sure you want to edit the category "${category}"?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        message.success('Category edited successfully');
      },
    });
  };

  const handleDeleteCategory = (category: string) => {
    Modal.confirm({
      title: 'Delete Category',
      content: `Are you sure you want to delete the category "${category}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        message.success('Category deleted successfully');
      },
    });
  };

  const onSearchChange = (category: string, value: string) => {
    setSearchMap((prev) => ({ ...prev, [category]: value }));
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
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

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchCategory.toLowerCase())
  );


  return (
    <div style={{ padding: '30px' }}>
      <Title level={2}>Prompt Dashboard</Title>

      <div style={{ padding: 24 }}>
      <Title level={3}>Category</Title>

      <Input
        placeholder="Search category"
        prefix={<SearchOutlined />}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {filteredCategories.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Title level={5}>No category found</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalVisible(true)}
          >
            Add Category
          </Button>
        </div>
      ) : (
        <Collapse defaultActiveKey={['Policy Review']}>
          {filteredCategories.map((category) => {
            const assessmentTypes = Array.from(
              new Set(
                prompts
                  .filter((p) => p.category === category)
                  .map((p) => p.assessmentType)
              )
            ).filter((type) =>
              type
                ?.toLowerCase()
                .includes((searchMap[category] || '').toLowerCase())
            );

            return (
              <Panel
                header={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{category}</strong>
                    <Space>
                      <Button type="text" icon={<EditOutlined />} onClick={() => handleEditCategory(category)}>
                        Edit
                      </Button>
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteCategory(category)}>
                        Delete
                      </Button>
                    </Space>
                  </div>
                }
                key={category}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Input
                    placeholder="Search assessment type"
                    prefix={<SearchOutlined />}
                    value={searchMap[category] || ''}
                    onChange={(e) => onSearchChange(category, e.target.value)}
                    style={{ marginBottom: 8 }}
                  />

                  {assessmentTypes.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                      <Title level={5}>No assessment type found</Title>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setAddModalVisible(true)}
                      >
                        Add Assessment Type
                      </Button>
                    </div>
                  ) : (
                    <Collapse>
                      {assessmentTypes.map((type) => (
                        <Panel header={<strong>{type}</strong>} key={type}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                setSelectedCategory(category);
                                setSelectedAssessmentType(type);
                                setAddModalVisible(true)}}
                            >
                              Add New Prompt
                            </Button>
                          </div>
                          <Table
                            columns={columns}
                            dataSource={prompts.filter(
                              (prompt) =>
                                prompt.category === category &&
                                prompt.assessmentType === type
                            )}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  )}
                </Space>
              </Panel>
            );
          })}
        </Collapse>
      )}

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
        <PromptForm form={addForm} initialValues={{
          category: selectedCategory ?? undefined,
          assessmentType: selectedAssessmentType ?? undefined,
        }}/>
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
    </div>
  );
};

export default PromptDashboard;

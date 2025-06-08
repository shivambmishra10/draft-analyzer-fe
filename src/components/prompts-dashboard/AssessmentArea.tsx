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
import {
  getAssessmentAreas,
  createAssessmentArea,
  updateAssessmentArea,
  deleteAssessmentArea,
} from '@/services/prompt-dashboard/assessmentAreaService';
import { AssessmentArea } from '@/model/AssessmentAreaModel';
import { removeEmptyFields } from '@/utils/helpers';
import AssessmentAreaForm from './AssessmentAreaForm';

const { Title, Text } = Typography;

const AssessmentAreas = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AssessmentArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedArea, setSelectedArea] = useState<AssessmentArea | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const areas = await getAssessmentAreas();
      setData(areas);
    } catch (error) {
      message.error('Failed to load assessment areas');
    } finally {
      setLoading(false);
    }
  };

  const showAddModal = () => {
    setFormMode('add');
    setSelectedArea(null);
    setModalVisible(true);
  };

  const handleRowClick = (record: AssessmentArea) => {
    setFormMode('edit');
    setSelectedArea(record);
    setModalVisible(true);
  };

  const handleSubmit = async (area: AssessmentArea) => {
    const cleanedArea = removeEmptyFields(area);

    try {
      if (formMode === 'add') {
        const created = await createAssessmentArea(cleanedArea as AssessmentArea);
        setData((prev) => [...prev, created]);
        message.success('Assessment area created');
      } else {
        const updated = await updateAssessmentArea(cleanedArea as AssessmentArea);
        setData((prev) =>
          prev.map((a) => (a.assessment_id === updated.assessment_id ? updated : a))
        );
        message.success('Assessment area updated');
      }
    } catch (err) {
      message.error('Operation failed');
    } finally {
      setModalVisible(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAssessmentArea(id);
      setData((prev) => prev.filter((area) => area.assessment_id !== id));
      message.success('Assessment area deleted');
    } catch (err) {
      message.error('Failed to delete assessment area');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'assessment_name',
      key: 'assessment_name',
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
      render: (_: any, record: AssessmentArea) => (
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
            title="Are you sure to delete this assessment area?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.assessment_id!);
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
      <Title level={2}>Assessment Areas</Title>
      <Text type="secondary" className="mb-4 block">
        Manage Assessment Areas
      </Text>

      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search assessment areas..."
          className="w-1/2 mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={showAddModal}>
          Add Assessment Area
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
            d.assessment_name?.toLowerCase().includes(search.toLowerCase())
          )}
          rowKey="assessment_id"
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      )}

      <AssessmentAreaForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        mode={formMode}
        initialData={selectedArea ?? undefined}
      />
    </div>
  );
};

export default AssessmentAreas;

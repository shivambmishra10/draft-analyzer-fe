import { Modal, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { AssessmentArea } from '@/model/AssessmentAreaModel';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (area: AssessmentArea) => void;
  mode: 'add' | 'edit';
  initialData?: AssessmentArea;
}

const AssessmentAreaForm: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<AssessmentArea>({
    assessment_id: 0,
    assessment_name: '',
    description: '',
    created_by: '',
    created_on: '',
    updated_by: '',
    updated_on: '',
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        assessment_name: '',
        description: '',
        created_by: '',
        updated_by: '',
      } as AssessmentArea);
    }
  }, [mode, initialData]);

  const handleChange = (field: keyof AssessmentArea, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={mode === 'edit' ? 'Edit Assessment Area' : 'Add New Assessment Area'}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="space-y-5">
        <div>
          <label className="block font-medium">Assessment Name</label>
          <Input
            value={formData.assessment_name}
            onChange={(e) => handleChange('assessment_name', e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <Input.TextArea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Created By</label>
          <Input
            value={formData.created_by}
            onChange={(e) => handleChange('created_by', e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Updated By</label>
          <Input
            value={formData.updated_by}
            onChange={(e) => handleChange('updated_by', e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            {mode === 'edit' ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssessmentAreaForm;

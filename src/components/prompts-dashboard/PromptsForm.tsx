import { Modal, Input, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Prompt, PromptType } from '@/model/PromptModel';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (prompt: Prompt) => void;
  mode: 'add' | 'edit';
  initialData?: Prompt;
}

const promptTypeOptions = Object.values(PromptType).map((type) => ({
  label: type,
  value: type,
}));

const PromptsForm: React.FC<Props> = ({ visible, onClose, onSubmit, mode, initialData }) => {
  const [formData, setFormData] = useState<Prompt>({
    prompt_type: PromptType.ASSESSMENT,
    criteria: '',
    description: '',
    technical_prompt: '',
    created_by: 'Admin',
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        prompt_type: PromptType.ASSESSMENT,
        criteria: '',
        description: '',
        technical_prompt: '',
        created_by: 'Admin',
      });
    }
  }, [mode, initialData]);

  const handleChange = (field: keyof Prompt, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={mode === 'edit' ? 'Edit Prompt' : 'Add New Prompt'}
      onCancel={onClose}
      footer={null}
      width="auto"
    >
      <div className="space-y-5">
        <div>
          <label className="block font-medium">Prompt Type</label>
          <Select
            value={formData.prompt_type}
            onChange={(value) => handleChange('prompt_type', value)}
            className="w-full"
            placeholder="Select Prompt Type"
            options={promptTypeOptions}
          />
        </div>
        <div>
          <label className="block font-medium">Criteria</label>
          <Input value={formData.criteria} onChange={(e) => handleChange('criteria', e.target.value)} />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <Input.TextArea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Technical Prompt</label>
          <Input.TextArea
            rows={3}
            value={formData.technical_prompt}
            onChange={(e) => handleChange('technical_prompt', e.target.value)}
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

export default PromptsForm;

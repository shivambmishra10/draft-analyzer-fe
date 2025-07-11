import { Modal, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { AssessmentArea } from '@/model/AssessmentAreaModel';
import { usePromptStore } from '@/store/promptStore';
import SearchableCheckboxList from './SearchableCheckboxList';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (area: AssessmentArea) => void;
  mode: 'add' | 'edit';
  initialData?: AssessmentArea;
}

// Internal form state stores prompt_ids as strings for compatibility with Checkbox.Group
type AssessmentAreaFormState = Omit<AssessmentArea, 'prompt_ids'> & {
  prompt_ids: string[];
};

const getEmptyFormData = (): AssessmentAreaFormState => ({
  assessment_id: 0,
  assessment_name: '',
  description: '',
  created_by: 'Admin',
  created_on: '',
  updated_by: '',
  updated_on: '',
  prompt_ids: [],
});

const AssessmentAreaForm: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<AssessmentAreaFormState>(getEmptyFormData());
  const [search, setSearch] = useState('');

  const { prompts, fetchPrompts } = usePromptStore();

  useEffect(() => {
    if (prompts.length === 0) {
      fetchPrompts().catch((error) => {
        console.error('Failed to fetch prompts:', error);
      });
    }
  }, [fetchPrompts, prompts.length]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        ...initialData,
        prompt_ids: initialData.prompt_ids?.map(String) || [],
      });
    } else {
      setFormData(getEmptyFormData());
    }
  }, [mode, initialData]);

  const handleChange = <K extends keyof AssessmentAreaFormState>(
    field: K,
    value: AssessmentAreaFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload: AssessmentArea = {
      ...formData,
      prompt_ids: formData.prompt_ids.map(Number),
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={mode === 'edit' ? 'Edit Assessment Area' : 'Add New Assessment Area'}
      onCancel={onClose}
      footer={null}
      width={1000}
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

        <SearchableCheckboxList
          title="Link Prompts"
          items={prompts
            .filter((p) => p.prompt_id !== undefined)
            .map((p) => ({
              id: String(p.prompt_id),
              label: p.question,
            }))}
          selectedIds={formData.prompt_ids}
          onChange={(ids) => handleChange('prompt_ids', ids)}
          search={search}
          onSearchChange={setSearch}
        />


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

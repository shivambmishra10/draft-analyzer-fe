import { Modal, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAssessmentAreaStore } from '@/store/assessmentAreaStore';
import { usePromptStore } from '@/store/promptStore';
import { DocumentType } from '@/model/DocumentModels';
import { PromptType } from '@/model/PromptModel';
import SearchableCheckboxList from './SearchableCheckboxList';
import SearchableRadioList from './SearchableRadioList';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (doc: DocumentType) => void;
  mode: 'add' | 'edit';
  initialData?: DocumentType;
}

type DocumentTypeFormState = Omit<DocumentType, 'assessment_ids' | 'doc_validation_prompt'> & {
  assessment_ids: string[];
  doc_validation_prompt: number;
};

const getEmptyFormData = (): DocumentTypeFormState => ({
  doc_type_id: 0,
  doc_type_name: '',
  description: '',
  doc_validation_prompt: 0,
  created_by: 'Admin',
  created_on: '',
  updated_by: '',
  updated_on: '',
  assessment_ids: [],
});

const DocumentTypeForm: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<DocumentTypeFormState>(getEmptyFormData());
  const [search, setSearch] = useState('');
  const [promptSearch, setPromptSearch] = useState('');

  const { assessmentAreas, fetchAssessmentAreas } = useAssessmentAreaStore();
  const { prompts, fetchPrompts } = usePromptStore();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        ...initialData,
        assessment_ids: initialData.assessment_ids?.map(String) || [],
        doc_validation_prompt: initialData.doc_validation_prompt,
      });
    } else {
      setFormData(getEmptyFormData());
    }
  }, [mode, initialData]);

  useEffect(() => {
    if (assessmentAreas.length === 0) {
      fetchAssessmentAreas().catch((error) => {
        console.error('Failed to load assessment areas:', error);
      });
    }
  }, [fetchAssessmentAreas, assessmentAreas.length]);

  useEffect(() => {
    if (prompts.length === 0) {
      fetchPrompts().catch((error) => {
        console.error('Failed to fetch prompts:', error);
      });
    }
  }, [fetchPrompts, prompts.length]);

  const handleChange = <K extends keyof DocumentTypeFormState>(field: K, value: DocumentTypeFormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.doc_type_name.trim()) {
      message.warning('Please enter a document type name.');
      return;
    }

    const payload: DocumentType = {
      ...formData,
      doc_validation_prompt: Number(formData.doc_validation_prompt),
      assessment_ids: formData.assessment_ids.map(Number),
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={mode === 'edit' ? 'Edit Document Type' : 'Add New Document Type'}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <div className="space-y-5">
        <div>
          <label className="block font-medium">Document Type Name</label>
          <Input
            value={formData.doc_type_name}
            onChange={(e) => handleChange('doc_type_name', e.target.value)}
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
          title="Link Assessment Areas"
          items={assessmentAreas
            .filter((a) => a.assessment_id !== undefined && a.assessment_name !== undefined)
            .map((a) => ({ id: a.assessment_id!, label: a.assessment_name! }))
          }
          selectedIds={formData.assessment_ids}
          onChange={(ids) => handleChange('assessment_ids', ids)}
          search={search}
          onSearchChange={setSearch}
        />

        <SearchableRadioList
          title="Select Validation Prompt"
          items={prompts
            .filter(p => p.prompt_type === PromptType.VALIDATION && p.prompt_id !== undefined)
            .map(p => ({ id: p.prompt_id as number, label: p.description }))
          }
          selectedId={formData.doc_validation_prompt}
          onChange={(id) => handleChange('doc_validation_prompt', id)}
          search={promptSearch}
          onSearchChange={setPromptSearch}
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

export default DocumentTypeForm;

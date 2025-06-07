import { Modal, Input, Button, Checkbox, Card } from 'antd';
import { useEffect, useState } from 'react';

interface DocumentType {
  doc_type_id?: number;
  doc_type_name: string;
  description: string;
  created_by?: string;
  created_on?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (doc: DocumentType, criteria: string[]) => void;
  mode: 'add' | 'edit';
  initialData?: DocumentType;
  initialCriteria?: string[];
  criteriaOptions: string[];
}

const DocumentTypeForm: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialData,
  initialCriteria = [],
  criteriaOptions
}) => {
  const [formData, setFormData] = useState<DocumentType>({
    doc_type_name: '',
    description: '',
  });

  const [checkedCriteria, setCheckedCriteria] = useState<string[]>([]);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
      setCheckedCriteria(initialCriteria);
    } else {
      setFormData({ doc_type_name: '', description: '' });
      setCheckedCriteria([]);
    }
  }, [mode, initialData, initialCriteria]);

  const handleChange = (field: keyof DocumentType, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData, checkedCriteria);
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={mode === 'edit' ? 'Edit Document Type' : 'Add New Document Type'}
      onCancel={onClose}
      footer={null}
      width={600}
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

        <div>
          <label className="block font-medium mb-2">Link Existing Criteria</label>
          <Card className="border rounded-lg p-4 max-h-48 overflow-y-auto">
            <Checkbox.Group
              value={checkedCriteria}
              onChange={(val) => setCheckedCriteria(val as string[])}
            >
              <div className="flex flex-col gap-2">
                {criteriaOptions.map((item) => (
                  <Checkbox key={item} value={item}>
                    {item}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Card>
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

export default DocumentTypeForm;

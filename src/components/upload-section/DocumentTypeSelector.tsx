import { Select, Typography, Spin, message } from "antd";
import { DocumentType } from "@/model/DocumentModels";
import { useEffect, useState } from "react";
import { useDocumentTypeStore } from "@/store/documentStore";

const { Option } = Select;
const { Text } = Typography;

interface Props {
  onSelect: (docType: DocumentType) => void;
  isDocTypeDisabled?: boolean; 
}

const DocumentTypeSelector: React.FC<Props> = ({ onSelect, isDocTypeDisabled }) => {
  const [selected, setSelected] = useState<DocumentType | undefined>(undefined);

  const {
      documentTypes,
      documentTypesLoading,
      fetchDocumentTypes,
    } = useDocumentTypeStore();

    // Fetch document types on mount
    useEffect(() => {
      if (documentTypes.length === 0) {
        fetchDocumentTypes().catch(() => {
          message.error('Failed to load document types');
        });
      }
    }, []);

  return (
    <div className="w-full max-w-sm">
      <Text strong>Select Document Type:</Text>
      {documentTypesLoading ? (
        <Spin style={{ display: "block", marginTop: 12 }} />
      ) : (
        <Select
          placeholder="Choose document type"
          style={{ width: "100%", marginTop: 8 }}
          value={selected?.doc_type_id}
          disabled={isDocTypeDisabled}
          onChange={(value) => {
            const docType = documentTypes.find(
              (dt) => dt.doc_type_id === value
            );
            if (docType) {
              setSelected(docType);
              onSelect(docType);
            }
          }}
        >
          {documentTypes.map((dt) => (
            <Option key={dt.doc_type_id} value={dt.doc_type_id}>
              {dt.doc_type_name}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default DocumentTypeSelector;

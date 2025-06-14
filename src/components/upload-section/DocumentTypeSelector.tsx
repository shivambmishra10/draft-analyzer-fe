import { Select, Typography, Spin } from "antd";
import { DocumentType } from "@/model/DocumentModels";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "@/services/documentService";

const { Option } = Select;
const { Text } = Typography;

interface Props {
  onSelect: (docType: DocumentType) => void;
}

const DocumentTypeSelector: React.FC<Props> = ({ onSelect }) => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [selected, setSelected] = useState<DocumentType | undefined>(undefined);

  useEffect(() => {
    loadDocumentTypes();
  }, []);

  const loadDocumentTypes = async () => {
    setIsLoadingTypes(true);
    try {
      const types = await getDocumentTypes();
      setDocumentTypes(types);
    } catch (error) {
      console.error("Failed to load document types:", error);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  return (
    <div className="w-full max-w-sm mt-6">
      <Text strong>Select Document Type:</Text>
      {isLoadingTypes ? (
        <Spin style={{ display: "block", marginTop: 12 }} />
      ) : (
        <Select
          placeholder="Choose document type"
          style={{ width: "100%", marginTop: 8 }}
          value={selected?.doc_type_id}
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

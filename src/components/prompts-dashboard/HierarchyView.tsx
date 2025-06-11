import React, { useEffect, useState } from 'react';
import { Collapse, message, Spin, Tag, Tooltip, Card } from 'antd';
import {
  FileTextOutlined,
  ProfileOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { getDocumentTypes } from '@/services/prompt-dashboard/documentTypeService';
import { getAssessmentAreas } from '@/services/prompt-dashboard/assessmentAreaService';
import { getPrompts } from '@/services/prompt-dashboard/promptService';
import { DocumentType } from '@/model/DocumentModels';
import { AssessmentArea } from '@/model/AssessmentAreaModel';
import { Prompt } from '@/model/PromptModel';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';

const { Panel } = Collapse;

const HierarchyView: React.FC = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [assessmentAreas, setAssessmentAreas] = useState<AssessmentArea[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDocKey, setActiveDocKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [docs, areas, prms] = await Promise.all([
          getDocumentTypes(),
          getAssessmentAreas(),
          getPrompts(),
        ]);
        setDocumentTypes(docs);
        setAssessmentAreas(areas);
        setPrompts(prms);
      } catch (error) {
        message.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const getAssessmentById = (id: number) =>
    assessmentAreas.find((a) => a.assessment_id === id);

  const getPromptById = (id: number) =>
    prompts.find((p) => p.prompt_id === id);

  const handleDocPanelChange = (key: string | string[]) => {
    if (typeof key === 'string') {
      setActiveDocKey(key);
    } else {
      setActiveDocKey(key[0] ?? null);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Hierarchy View</Title>
      <Text type="secondary" className="mb-4 block">
        Display the hierarchy of document types, assessment areas, and prompts.
      </Text>
      <Spin spinning={loading} tip="Loading hierarchy...">
        <Collapse
          accordion
          activeKey={activeDocKey ?? undefined}
          onChange={handleDocPanelChange}
          bordered={false}
        >
          {documentTypes.map((doc) => (
            <Panel
              key={`doc-${doc.doc_type_id}`}
              header={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FileTextOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                  <span style={{ fontWeight: 500 }}>{doc.doc_type_name}</span>
                  <Tag color="blue" style={{ marginLeft: 'auto' }}>
                    Document Type
                  </Tag>
                </div>
              }
            >
              <Card
                bordered
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}
                bodyStyle={{ padding: 16 }}
              >
                <Collapse accordion ghost>
                  {doc.assessment_ids?.map((aid) => {
                    const assessment = getAssessmentById(aid);
                    if (!assessment) return null;

                    return (
                      <Panel
                        header={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ProfileOutlined
                              style={{ marginRight: 8, color: '#52c41a' }}
                            />
                            <span>{assessment.assessment_name}</span>
                            <Tag color="green" style={{ marginLeft: 'auto' }}>
                              Assessment Area
                            </Tag>
                          </div>
                        }
                        key={`assess-${assessment.assessment_id}`}
                      >
                        {(assessment?.prompt_ids?.length ?? 0) > 0 ? (
                          <ul style={{ paddingLeft: 24, listStyle: 'none' }}>
                            {(assessment.prompt_ids ?? []).map((pid) => {
                              const prompt = getPromptById(pid);
                              return (
                                <li
                                  key={`prompt-${pid}`}
                                  style={{
                                    marginBottom: 8,
                                    padding: '4px 8px',
                                    borderRadius: 4,
                                    transition: 'background 0.2s',
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      '#f5f5f5')
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      'transparent')
                                  }
                                >
                                  <Tooltip title={prompt?.question}>
                                    <MessageOutlined
                                      style={{ marginRight: 8, color: '#faad14' }}
                                    />
                                    <span>
                                      {prompt?.question ?? `Prompt ID: ${pid}`}
                                    </span>
                                  </Tooltip>
                                  <Tag color="gold" style={{ marginLeft: 8 }}>
                                    Prompt
                                  </Tag>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p
                            style={{
                              marginLeft: 8,
                              fontStyle: 'italic',
                              color: '#999',
                            }}
                          >
                            No prompts linked.
                          </p>
                        )}
                      </Panel>
                    );
                  })}
                </Collapse>
              </Card>
            </Panel>
          ))}
        </Collapse>
      </Spin>
    </div>
  );
};

export default HierarchyView;

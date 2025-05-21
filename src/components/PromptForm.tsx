import React from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { type Prompt } from '@/store/promptStore';

const { Option } = Select;

interface PromptFormProps {
  initialValues?: Partial<Prompt>;
  form: any; // Form instance
}

const categories = [
  'Objectives',
  'Implementation',
  'Equity',
  'Timeline',
  'Financial',
  'Stakeholders',
  'Risks',
  'Impact',
  'Other'
];

const assessmentTypes = [
  'Goal Setting',
  'Inclusion',
  'Timeline',
  'Budgeting',
  'Cost Analysis',
  'Others'
];

const PromptForm: React.FC<PromptFormProps> = ({ initialValues = {}, form }) => {
  const isCategoryDisabled = !!initialValues.category;
  const isAssessmentTypeDisabled = !!initialValues.assessmentType;

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        name="question"
        label="Question"
        rules={[{ required: true, message: 'Please input the prompt question' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter the prompt question..." />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select
          placeholder="Select a category"
          disabled={isCategoryDisabled}
        >
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="assessmentType"
        label="Assessment Type"
        rules={[{ required: true, message: 'Please select an assessment type' }]}
      >
        <Select
          placeholder="Select an assessment type"
          disabled={isAssessmentTypeDisabled}
        >
          {assessmentTypes.map(assessmentType => (
            <Option key={assessmentType} value={assessmentType}>{assessmentType}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="isRequired"
        label="Required"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default PromptForm;

import { useState } from 'react';
import Sidebar from '../components/prompts-dashboard/Sidebar';
import DocumentTypes from '../components/prompts-dashboard/DocumentTypes';
import AssessmentCriteria from '../components/prompts-dashboard/AssessmentCriteria';
import Prompts from '../components/prompts-dashboard/Prompts';
import HierarchyView from '../components/prompts-dashboard/HierarchyView';

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState('document-types');

  const renderContent = () => {
    switch (selectedKey) {
      case 'document-types':
        return <DocumentTypes />;
      case 'assessment-criteria':
        return <AssessmentCriteria />;
      case 'prompts':
        return <Prompts />;
      case 'hierarchy-view':
        return <HierarchyView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white border-r">
        <Sidebar selectedKey={selectedKey} onSelect={setSelectedKey} />
      </div>
      <div className="flex-1 bg-gray-50">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
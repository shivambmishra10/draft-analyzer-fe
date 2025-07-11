import { Menu } from 'antd';
import {
  FileTextOutlined,
  CheckSquareOutlined,
  BulbOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const menuItems = [
  {
    key: 'document-types',
    icon: <FileTextOutlined />,
    label: 'Document Types',
  },
  {
    key: 'assessment-area',
    icon: <CheckSquareOutlined />,
    label: 'Assessment Area',
  },
  {
    key: 'prompts',
    icon: <BulbOutlined />,
    label: 'Prompts',
  },
  {
    key: 'hierarchy-view',
    icon: <ApartmentOutlined />,
    label: 'Hierarchy View',
  },
];

const Sidebar = ({
  selectedKey,
  onSelect,
}: {
  selectedKey: string;
  onSelect: (key: string) => void;
}) => {
  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      onClick={({ key }) => onSelect(key)}
      className="w-full border-r h-full"
      items={menuItems}
    />
  );
};

export default Sidebar;
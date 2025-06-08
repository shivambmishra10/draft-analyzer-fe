import { Menu } from 'antd';
import {
  FileTextOutlined,
  CheckSquareOutlined,
  BulbOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const Sidebar = ({ selectedKey, onSelect }: { selectedKey: string; onSelect: (key: string) => void }) => {
  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      onClick={({ key }) => onSelect(key)}
      className="w-full border-r h-full"
    >
      <Menu.Item key="document-types" icon={<FileTextOutlined />}>
        Document Types
      </Menu.Item>
      <Menu.Item key="assessment-area" icon={<CheckSquareOutlined />}>
        Assessment Area
      </Menu.Item>
      <Menu.Item key="prompts" icon={<BulbOutlined />}>
        Prompts
      </Menu.Item>
      <Menu.Item key="hierarchy-view" icon={<ApartmentOutlined />}>
        Hierarchy View
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
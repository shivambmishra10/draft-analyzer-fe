import { Layout, Menu, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const userMenuItems = [
  {
    key: "1",
    label: <Text strong>John Doe</Text>,
  },
  {
    key: "2",
    label: <a href="#">Profile</a>,
  },
  {
    key: "3",
    label: <a href="#">Logout</a>,
  },
];

const Header = () => {
  return (
    <AntHeader className="!bg-white !px-0 shadow-md sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="https://www.civis.vote/assets/images/navlogo.png"
            alt="Logo"
            className="h-12 object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="horizontal"
          className="hidden md:flex border-b-0 flex-1 justify-center"
          style={{ minWidth: 0 }}
          items={[
            { key: "home", label: <a href="/">Home</a> },
            { key: "upload", label: <a href="/upload">Upload Document</a> },
            { key: "history", label: <a href="/my-documents">My Documents</a> },
            {
              key: "frameworks",
              label: <a href="/frameworks">Assessment Frameworks</a>,
            }
          ]}
        />

        {/* User Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600"
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;

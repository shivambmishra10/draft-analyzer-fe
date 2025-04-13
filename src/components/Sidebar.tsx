import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 p-4 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } hidden md:block`}
    >
      <div className="flex justify-between items-center mb-4">
        {!collapsed && <span className="text-xl font-semibold">Menu</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600 hover:text-black">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="space-y-4">
        <Link to="/dashboard" className="block text-gray-700 hover:text-blue-700">
          {!collapsed ? 'Dashboard' : <Menu size={20} />}
        </Link>
        <Link to="/upload-policy" className="block text-gray-700 hover:text-blue-700">
          {!collapsed ? 'Upload Policy' : <Menu size={20} />}
        </Link>
        <Link to="/assessment" className="block text-gray-700 hover:text-blue-700">
          {!collapsed ? 'Assessment' : <Menu size={20} />}
        </Link>
        <Link to="/reports" className="block text-gray-700 hover:text-blue-700">
          {!collapsed ? 'Reports' : <Menu size={20} />}
        </Link>
        <Link to="/settings" className="block text-gray-700 hover:text-blue-700">
          {!collapsed ? 'Settings' : <Menu size={20} />}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

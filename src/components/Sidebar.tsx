import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300 hidden md:block">
    <nav className="space-y-4">
      <Link to="/" className="block text-gray-700 hover:text-blue-700">Dashboard</Link>
      <Link to="/upload-policy" className="block text-gray-700 hover:text-blue-700">Upload Policy</Link>
      <Link to="/reports" className="block text-gray-700 hover:text-blue-700">Analysis Reports</Link>
      <Link to="/settings" className="block text-gray-700 hover:text-blue-700">Settings</Link>
    </nav>
  </aside>
);

export default Sidebar;

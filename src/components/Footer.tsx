import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-blue-700 text-white p-4 text-center">
    &copy; {new Date().getFullYear()} Policy Analyzer. All rights reserved.
  </footer>
);

export default Footer;

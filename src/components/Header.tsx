import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="https://www.civis.vote/assets/images/navlogo.png" alt="Logo" className="h-10" />
        {/* <span className="font-bold text-2xl text-blue-600">Civis</span> */}
      </div>
      <nav className="hidden md:flex gap-6 text-gray-600">
        <a href="#" className="hover:text-blue-600 transition">Home</a>
        <a href="#" className="hover:text-blue-600 transition">About Us</a>
        <a href="#" className="hover:text-blue-600 transition">Services</a>
        <a href="#" className="hover:text-blue-600 transition">Resources</a>
      </nav>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-full transition">
        Login
      </button>
    </header>
  );
};

export default Header;

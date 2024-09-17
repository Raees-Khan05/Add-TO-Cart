import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather'; // For hamburger menu and close icons
// import CartIcon from './CartIcon'; // Your custom cart icon component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-600">
          Brand
        </Link>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-600" />}
        </div>

        {/* Navigation Links */}
        <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 transition">About</Link>
          <Link to="/products" className="text-gray-700 hover:text-purple-600 transition">Products</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">Contact</Link>
        </div>

        {/* Search Bar */}
        

        {/* Custom Cart Icon */}
        <div className="hidden md:flex">
          {/* <CartIcon /> */}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

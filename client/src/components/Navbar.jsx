import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left - Brand */}
        <div className="text-2xl font-bold text-blue-600">SkillTribe</div>

        {/* Center - Menu (desktop) */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <a href="#" className="hover:text-blue-600 transition">Skills</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
          <Link to="/learning-plan" className="hover:text-blue-600 transition">Learning Plan</Link>
        </div>

        {/* Right - Login button */}
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </div>

        {/* Hamburger menu (mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-gray-700">
          <a href="#" className="block hover:text-blue-600">Home</a>
          <a href="#" className="block hover:text-blue-600">About</a>
          <a href="#" className="block hover:text-blue-600">Skills</a>
          <a href="#" className="block hover:text-blue-600">Contact</a>
          <Link to="/learning-plan" className="block hover:text-blue-600">Learning Plan</Link>
          <button className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


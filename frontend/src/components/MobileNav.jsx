import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="flex flex-col space-y-2 p-4">
            <ThemeToggle />
            <button
              onClick={() => handleNavigate("/features")}
              className="flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors duration-300 w-full"
            >
              Features
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="flex items-center space-x-2 px-4 py-2 border-2 border-green-500 text-black dark:text-white font-semibold rounded-md cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300 w-full justify-center"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => handleNavigate("/signup")}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer w-full justify-center"
            >
              <UserPlus2 className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

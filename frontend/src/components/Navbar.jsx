import React from "react";
import { useNavigate } from "react-router-dom";
import { LeafIcon, LogIn, UserPlus2 } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItemClass =
    "relative cursor-pointer text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300";

  return (
    <nav className="w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl shadow-md">
            <LeafIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            VerdiGo
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-10 font-medium text-sm tracking-wide">
          {[
            { name: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            { name: "Features", action: () => navigate("/features") },
            { name: "Pricing", action: () => handleScroll("pricing-section") },
            { name: "FAQs", action: () => handleScroll("faqs-section") },
            { name: "Contact", action: () => handleScroll("contact-section") },
          ].map((item, index) => (
            <li
              key={index}
              onClick={item.action}
              className={navItemClass}
            >
              {item.name}

              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </motion.button>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="flex items-center space-x-2 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <UserPlus2 className="w-4 h-4" />
            <span>Sign Up</span>
          </motion.button>
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;

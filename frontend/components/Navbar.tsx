import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 flex items-center gap-1"
        >
          <span>
            <FiPieChart />
          </span>{" "}
          Coincise
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/reports" className="hover:text-blue-600 transition">
            Reports
          </Link>
          <Link href="/settings" className="hover:text-blue-600 transition">
            Settings
          </Link>
        </nav>

        {/* Profile Icon */}
        <div className="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer">
          <FaUserCircle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

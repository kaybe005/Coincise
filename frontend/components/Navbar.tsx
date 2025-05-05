import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
          </span>
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

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-600 hover:text-gray-800"
          >
            <FaUserCircle />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
              {user ? (
                <div className="px-4 py-3 space-y-2">
                  <p className="text-sm text-gray-700 font-medium">
                    Hi, {user.name || user.email}
                  </p>
                  <button
                    onClick={logout}
                    className="w-full text-left text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md px-2 py-2 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-4 py-3 space-y-2">
                  <Link
                    href="/login"
                    className="block w-full text-sm text-[#0A2540] font-medium hover:text-[#0057FF] hover:bg-gray-50 rounded-md px-2 py-2 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-sm text-[#0A2540] font-medium hover:text-[#0057FF] hover:bg-gray-50 rounded-md px-2 py-2 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

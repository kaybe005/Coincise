"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-[#0A2540] shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1"
        >
          <FiPieChart />
          Coincise
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
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

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
          >
            {theme === "light" ? <BsMoon /> : <BsSun />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-800"
            >
              <span className="relative top-[3px] left-[5px]">
                <FaUserCircle />
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1c2c40] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 animate-fadeIn">
                {user ? (
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-white font-medium">
                      Hi, {user.name || user.email}
                    </p>
                    <button
                      onClick={logout}
                      className="w-full text-left text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-md px-2 py-2 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-3 space-y-2">
                    <Link
                      href="/login"
                      className="block w-full text-sm text-[#0A2540] dark:text-white font-medium hover:text-[#0057FF] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-2 py-2 transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-sm text-[#0A2540] dark:text-white font-medium hover:text-[#0057FF] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-2 py-2 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

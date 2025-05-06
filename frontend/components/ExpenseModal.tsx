"use client";

import React, { useEffect, useState } from "react";

export interface ExpenseData {
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: ExpenseData) => void;
  type: "income" | "expense";
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  type,
}) => {
  const [form, setForm] = useState<ExpenseData>({
    type,
    category: "",
    amount: 0,
    date: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        type,
        category: "",
        amount: 0,
        date: "",
        description: "",
      });
    }
  }, [isOpen, type]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.category || !form.amount || !form.date) return;
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  const categoryOptions =
    type === "expense"
      ? ["Food", "Transport", "Bills", "Entertainment", "Other"]
      : ["Salary", "Freelance", "Interest", "Gifts", "Other"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#0A2540] rounded-lg p-6 w-full max-w-md shadow-lg border border-[#E6EBF2] dark:border-gray-700">
        <h2 className="text-xl font-semibold text-[#0A2540] dark:text-white mb-4">
          Add New {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>

        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-[#2D3748] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            >
              <option value="">Select</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-[#2D3748] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-[#2D3748] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border rounded-md text-sm resize-none bg-white dark:bg-[#2D3748] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#0057FF] text-white text-sm hover:bg-[#0040CC]"
          >
            Save {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;

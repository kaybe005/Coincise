"use client";

import React, { useState } from "react";

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
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<ExpenseData>({
    type: "expense",
    category: "",
    amount: 0,
    date: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if ( !form.type || !form.category || !form.amount || !form.date) return;
    onSave(form);
    onClose();
    setForm({ type: "", category: "", amount: 0, date: "", description: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg border border-[#E6EBF2]">
        <h2 className="text-xl font-semibold text-[#0A2540] mb-4">
          Add New Expense
        </h2>
  
        <div className="space-y-4">
          {/* Type Selector */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            >
              <option value="expense">Expense</option>
            </select>
          </div>
  
          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            >
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            />
          </div>
  
          {/* Date */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
            />
          </div>
  
          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
              placeholder="Optional"
            />
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-sm hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#0057FF] text-white text-sm hover:bg-[#0040CC]"
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;

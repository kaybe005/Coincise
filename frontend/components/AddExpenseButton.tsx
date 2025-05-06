"use client";

import React from "react";

interface AddExpenseButtonProps {
  onOpen: (type: "income" | "expense") => void;
}

const AddExpenseButton = ({ onOpen }: AddExpenseButtonProps) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onOpen("income")}
        className="px-4 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 transition"
      >
        + Add Income
      </button>
      <button
        onClick={() => onOpen("expense")}
        className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
      >
        + Add Expense
      </button>
    </div>
  );
};

export default AddExpenseButton;

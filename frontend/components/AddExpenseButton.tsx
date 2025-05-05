"use client";

import React from "react";

const AddExpenseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0057FF] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#0040CC] transition"
    >
    + Add Expense
    </button>
  );
};

export default AddExpenseButton;

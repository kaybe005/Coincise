"use client";

import React from "react";
import { HiExclamationCircle } from "react-icons/hi2";

const BudgetAlert = () => {
  return (
    <div className="flex items-start dark:bg-[#0A2540] dark:text-white gap-3 bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded-lg text-sm max-w-xs">
      <span className="mt-1">
        {
          HiExclamationCircle({
            size: 20,
            className: "mt-1",
          }) as unknown as JSX.Element
        }
      </span>
      <span>Keep an eye on your spending!</span>
    </div>
  );
};

export default BudgetAlert;

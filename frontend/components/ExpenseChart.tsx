import React from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const data = {
    labels: ["Food", "Rent", "Shopping"],
    datasets: [
      {
        data: [950, 1200, 800],
        backgroundColor: ["#00C4A3", "#0057FF", "#E6EBF2"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <p className="text-gray-500 text-sm mb-4">Expense Breakdown</p>
      <Doughnut data={data} />
      <div className="mt-4 flex justify-around text-sm text-[#0A2540]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#00C4A3] rounded-full" /> Food
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#0057FF] rounded-full" /> Rent
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#E6EBF2] rounded-full" /> Shopping
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;

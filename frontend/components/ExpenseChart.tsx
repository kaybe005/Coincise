import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  type: string;
  category: string;
  amount: number;
}

const ExpenseChart = ({ transactions }: { transactions: Transaction[] }) => {
  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const labels = Object.keys(expenseData);
  const data = Object.values(expenseData);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#0057FF",
          "#00C4A3",
          "#FF3D93",
          "#6B7C93",
          "#FFA500",
        ],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[#0A2540] shadow rounded-xl p-6">
      <p className="text-gray-500 text-sm dark:text-white mb-4">
        Expense Breakdown
      </p>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ExpenseChart;

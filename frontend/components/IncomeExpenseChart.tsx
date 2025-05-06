"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
import { ExpenseData } from "./ExpenseModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  transactions: ExpenseData[];
}

const IncomeExpenseChart = ({ transactions }: Props) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { income, expense } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      if (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      ) {
        if (tx.type === "income") income += tx.amount;
        else if (tx.type === "expense") expense += tx.amount;
      }
    });

    return { income, expense };
  }, [transactions]);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#00C4A3", "#FF3D57"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
        grid: { color: "#E6EBF2" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <>
      <div className="bg-white  dark:bg-[#0A2540] rounded-xl p-4 border border-[#E6EBF2] shadow-sm">
        <h3 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-2">
          Income vs. Expenses (This Month)
        </h3>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default IncomeExpenseChart;

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = () => {
  const data = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Expenses",
        data: [28, 34, 30, 33, 38, 45],
        backgroundColor: "#0057FF",
        borderRadius: 6,
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
        ticks: {
          stepSize: 10,
        },
        grid: { color: "#E6EBF2" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-[#E6EBF2] shadow-sm">
      <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
        Income vs. Expenses
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};
export default IncomeExpenseChart;

"use client";

import {
  FaUtensils,
  FaHome,
  FaTshirt,
  FaGasPump,
  FaMoneyBillWave,
  FaQuestion,
  FaTrashAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  _id?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return <FaUtensils />;
    case "bills":
      return <FaHome />;
    case "transport":
      return <FaGasPump />;
    case "clothing":
      return <FaTshirt />;
    case "salary":
      return <FaMoneyBillWave />;
    default:
      return <FaQuestion />;
  }
};

const RecentTransactions = ({
  transactions,
  onDelete,
}: {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}) => {
  const { user, token } = useAuth();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#0A2540] rounded-xl p-4 border border-[#E6EBF2] dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-4">
        Recent Transactions
      </h3>
      <ul className="space-y-3">
        {recent.map((item) => (
          <li key={item._id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span
                className={`text-lg ${
                  item.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {getIconForCategory(item.category)}
              </span>
              <span className="text-sm text-[#0A2540] dark:text-gray-200">
                {item.category} – {item.description || "No description"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#0A2540] dark:text-white font-medium">
                {item.type === "expense" ? "–" : "+"}${item.amount.toFixed(2)}
              </span>
              {item._id && (
                <button
                  onClick={() => onDelete(item._id!)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="Delete"
                >
                  ✕
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;

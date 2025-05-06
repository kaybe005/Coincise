"use client";

import {
  FaUtensils,
  FaHome,
  FaTshirt,
  FaGasPump,
  FaMoneyBillWave,
  FaQuestion,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  _id: string;
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

const RecentTransactions = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/transactions/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactions(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    if (user?.email && token) {
      fetchTransactions();
    }
  }, [user, token]);

  return (
    <div className="bg-white rounded-xl p-4 border border-[#E6EBF2] shadow-sm">
      <h3 className="text-lg font-semibold text-[#0A2540] mb-4">
        Recent Transactions
      </h3>
      <ul className="space-y-3">
        {transactions.map((item) => (
          <li key={item._id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span
                className={`text-lg ${
                  item.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {getIconForCategory(item.category)}
              </span>
              <span className="text-sm text-[#0A2540]">
                {item.category} - {item.description || "No description"}
              </span>
            </div>
            <span className="text-sm text-[#0A2540] font-medium">
              {item.type === "expense" ? "–" : "+"}${item.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;

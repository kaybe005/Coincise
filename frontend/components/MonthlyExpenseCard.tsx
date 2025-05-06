"use client";

import { useMemo } from "react";

interface Transaction {
  type: string;
  amount: number;
  date: string;
}

const MonthlyIncomeCard = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = useMemo(() => {
    return transactions
      .filter(
        (tx) =>
          tx.type === "expense" &&
          new Date(tx.date).getMonth() === currentMonth &&
          new Date(tx.date).getFullYear() === currentYear
      )
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-[#0A2540] rounded-xl p-4 border border-[#E6EBF2] shadow-sm">
      <h3 className="text-sm text-gray-500 dark:text-white mb-1">
        Monthly Expense
      </h3>
      <p className="text-2xl font-semibold text-red-500">
        ${monthlyIncome.toFixed(2)}
      </p>
    </div>
  );
};

export default MonthlyIncomeCard;

"use client";

import Head from "next/head";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseChart from "../components/ExpenseChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { useMemo } from "react";

export default function Reports() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { user, loading, token } = useAuth();
  const router = useRouter();

  const topExpenses = useMemo(() => {
    return [...transactions]
      .filter((t) => t.type === "expense")
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [transactions]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:5005/api/transactions/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    };

    if (!loading && user) {
      fetchTransactions();
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, token]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Reports | Coincise</title>
      </Head>
      <Navbar />

      <main className="bg-[#F9FAFB] dark:bg-[#0D1117] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] dark:text-white mb-8">
          Monthly Report
        </h1>

        <p className="text-sm text-gray-500 font-bold dark:text-gray-400 mb-9">
          Track your financial performance at a glance including total income,
          spending patterns, savings, and the top expenses you've made this
          month.
        </p>

        <section className="grid-cols-1 grid md:grid-cols-2 gap-6 mb-8">
          <div className="h-full">
            <ExpenseChart transactions={transactions} />
          </div>
          <div className="h-full">
            <IncomeExpenseChart transactions={transactions} />
            <div className="mt-4 p-4 bg-[#F0F4FF] dark:bg-[#2C3E50] rounded-lg text-sm text-[#0A2540] dark:text-white shadow-sm transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer">
              <h4 className="font-semibold mb-1">💡 Financial Tip</h4>
              <p>
                Track your expenses regularly to stay within your monthly budget
                and avoid unnecessary spending.
              </p>
            </div>
            <div className="mt-4 p-4 bg-[#E6EBF2] dark:bg-[#2C3E50] rounded-lg text-sm text-[#0A2540] dark:text-white shadow-sm transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer">
              <h4 className="font-semibold mb-1">🎯 Goal Reminder</h4>
              <p>
                Set a monthly savings goal. Small steps each month lead to big
                results over time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#0A2540] border border-[#E6EBF2] rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-4">
            Top 5 Largest Expenses
          </h3>
          {topExpenses.length > 0 ? (
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {topExpenses.map((exp, idx) => (
                  <tr
                    key={idx}
                    className="bg-white dark:bg-[#0A2540] border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-medium text-[#0A2540] dark:text-white">
                      {exp.category}
                    </td>
                    <td className="px-4 py-2 text-red-600">
                      –${exp.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{exp.description || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-400 text-center py-6">
              No expenses recorded yet.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

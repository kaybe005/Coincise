import Head from "next/head";
import Navbar from "../components/Navbar";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import MonthlyExpenseCard from "../components/MonthlyExpenseCard";
import AddExpenseButton from "../components/AddExpenseButton";
import BudgetAlert from "../components/BudgetAlert";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseModal from "../components/ExpenseModal";
import { ExpenseData } from "../components/ExpenseModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense">("expense");
  const { user, token, loading } = useAuth();
  const [transactions, setTransactions] = useState<ExpenseData[]>([]);
  const router = useRouter();

  const openModal = (type: "income" | "expense") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  const fetchTransactions = async () => {
    if (!user?.email || !token) return;
    try {
      const res = await axios.get(
        `http://localhost:5005/api/transactions/${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchTransactions();
    }
  }, [user, token]);

  const handleAddExpense = async (expense: ExpenseData) => {
    if (!user?.email || !token) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5005/api/transactions",
        {
          ...expense,
          type: expense.type.toLowerCase(),
          userEmail: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchTransactions();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5005/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Coincise</title>
      </Head>
      <Navbar />

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
        type={modalType}
      />

      <div className="bg-[#F9FAFB] dark:bg-[#0D1117] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] dark:text-white mb-8">
          Welcome back, {user?.name || "Guest"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <MonthlyIncomeCard transactions={transactions} />
            <MonthlyExpenseCard transactions={transactions} />
            <AddExpenseButton onOpen={openModal} />
            <BudgetAlert />
          </div>

          <div>
            <ExpenseChart transactions={transactions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <IncomeExpenseChart transactions={transactions} />
          <RecentTransactions
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>
    </>
  );
}

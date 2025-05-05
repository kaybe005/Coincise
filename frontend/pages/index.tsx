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
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, token } = useAuth();

  const handleAddExpense = async (expense: ExpenseData) => {
    if (!user?.email || !token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await axios.post(
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
      console.log("Transaction added:", response.data);
      toggleModal();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <Head>
        <title>Coincise</title>
      </Head>
      <Navbar />

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSave={handleAddExpense}
      />

      <div className="bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] mb-8">
          Welcome back, {user?.name || "Guest"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <MonthlyIncomeCard />
            <MonthlyExpenseCard />
            <AddExpenseButton onClick={toggleModal} />
            <BudgetAlert />
          </div>

          <div>
            <ExpenseChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <IncomeExpenseChart />
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}

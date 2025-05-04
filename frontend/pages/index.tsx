import Head from "next/head";
import Navbar from "../components/Navbar";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyIncomeCard from "../components/MonthlyIncomeCard";
import MonthlyExpenseCard from "../components/MonthlyExpenseCard";
import AddExpenseButton from "../components/AddExpenseButton";
import BudgetAlert from "../components/BudgetAlert";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import RecentTransactions from "../components/RecentTransactions";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coincise</title>
      </Head>
      <Navbar />

      <div className="bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] mb-8">
    Welcome back, Kalash 
  </h1>

  {/* Top grid: Cards + Chart */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left side: stacked cards */}
    <div className="space-y-6 lg:col-span-2">
      <MonthlyIncomeCard />
      <MonthlyExpenseCard />
      <AddExpenseButton />
      <BudgetAlert />
    </div>

    {/* Right side: Chart */}
    <div>
      <ExpenseChart />
    </div>
  </div>

  {/* Bottom grid: Bar chart + Transactions */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <IncomeExpenseChart />
    <RecentTransactions />
  </div>
</div>
    </>
  );
}

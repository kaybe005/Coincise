import { HiExclamationCircle } from "react-icons/hi";

const BudgetAlert = () => {
  return (
    <div className="flex items-start dark:bg-[#0A2540] dark:text-white gap-3 bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded-lg text-sm max-w-xs">
      <HiExclamationCircle size={20} className="mt-1" />
      <span>Keep an eye on your spending!</span>
    </div>
  );
};

export default BudgetAlert;

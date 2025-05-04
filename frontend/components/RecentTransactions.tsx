import { FaUtensils, FaHome, FaTshirt, FaGasPump } from "react-icons/fa";

const transactions = [
  {
    label: "Groceries",
    amount: -150,
    icon: <FaUtensils />,
    color: "text-green-600",
  },
  { label: "Rent", amount: -1200, icon: <FaHome />, color: "text-blue-600" },
  {
    label: "Clothing",
    amount: -85,
    icon: <FaTshirt />,
    color: "text-orange-500",
  },
  { label: "Gas", amount: -40, icon: <FaGasPump />, color: "text-gray-500" },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#E6EBF2] shadow-sm">
      <h3 className="text-lg font-semibold text-[#0A2540] mb-4">
        Recent Transactions
      </h3>
      <ul className="space-y-3">
        {transactions.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`text-lg ${item.color}`}>{item.icon}</span>
              <span className="text-sm text-[#0A2540]">{item.label}</span>
            </div>
            <span className="text-sm text-[#0A2540] font-medium">
              –${item.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;

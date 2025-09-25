// ✅ components/dashboard/shared/StatCard.tsx
import React from "react";

interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  amount,
  change,
  isPositive,
}) => {
  return (
    <div className="w-80 h-50 border border-[#E09721] rounded-xl p-4 mb-15 flex flex-col justify-between shadow-md text-center">
      <h3 className="text-white text-xl font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2 text-white">{amount}</p>
      <span
        className={`mt-2 text-sm font-semibold flex mb-5 justify-center ${
          isPositive ? "text-secondary-400" : "text-red-400"
        }`}>
        {change}
      </span>
    </div>
  );
};

export default StatCard;

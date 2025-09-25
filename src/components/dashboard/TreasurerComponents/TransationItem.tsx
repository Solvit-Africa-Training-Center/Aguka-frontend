// ✅ components/dashboard/shared/TransactionItem.tsx
import React from "react";

interface TransactionItemProps {
  name: string;
  type: string;
  date: string;
  amount: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  type,
  date,
  amount,
}) => {
  return (
    <div className="flex justify-between items-center py-2 space-y-4">
      <div>
        <p className="text-white text-3xl font-medium">{name}</p>
        <p className="text-white text-1xl">
          {type} • {date}
        </p>
      </div>
      <p className="text-white text-3xl font-semibold">{amount}</p>
    </div>
  );
};

export default TransactionItem;

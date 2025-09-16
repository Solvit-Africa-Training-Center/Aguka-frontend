import React from "react";
import type { LucideIcon } from "lucide-react"; 

interface StatsCardProps {
  title: string;
  value: string;
  icon?: LucideIcon; 
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon }) => {
  return (
 <div className="bg-[#00353B]text-white rounded-2xl border-[5px] border-[#F9A825] p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">

  <div className="flex justify-end">
    {Icon && <Icon className="w-8 h-8 opacity-80 text-[#F9A825]" />}
  </div>


  <div className="flex flex-col items-center mt-3">
    <p className="text-3xl font-medium opacity-90">{title}</p>
    <p className="font-bold text-2xl mt-5">{value}</p>
  </div>
</div>


  );
};

export default StatsCard;

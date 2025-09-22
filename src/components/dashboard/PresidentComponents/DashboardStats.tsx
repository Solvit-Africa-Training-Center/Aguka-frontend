import React from "react";
import { Users, DollarSign, ArrowUpCircle, Clock } from "lucide-react"; 
import type { LucideIcon } from "lucide-react"; 
// import { useGetUsersQuery } from "@services/api/authApi";
// import { useSelector } from "react-redux";
// import type { RootState } from "@services/store/store";


interface StatsCardProps {
  title: string;
  value: string;
  icon?: LucideIcon; 
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-[#00353B] text-white rounded-2xl border-4 border-[#F9A825] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col font-poppins"
     style={{
        border: "4px solid #F9A825",
        boxShadow: "0 0 10px rgba(249, 168, 37, 0.6)", 
      }}>
      <div className="flex justify-end">
        {Icon && <Icon className="w-8 h-8 opacity-80 text-[#F9A825]" />}
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-xl font-medium opacity-90">{title}</p>
        <p className="font-bold text-2xl mt-3">{value}</p>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
// const { data, isLoading } = useGetUsersQuery();
// const users = Array.isArray(data) ? data : [];

// const currentUser = useSelector((state: RootState) => state.auth.user);
// const currentGroupId = currentUser?.groupId;

// const totalUsersInGroup = currentGroupId
//   ? users.filter(user => user.groupId === currentGroupId).length
//   : 0;

  

  return (
    <div className="w-full font-poppins pt-6 px-4 md:px-0">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                 {/* <StatsCard
          title="Total Members"
          value={isLoading ? "..." : totalUsersInGroup.toString()}
          icon={Users}
        /> */}
  <StatsCard title="Total Members" value="Frw 276" icon={Users} />
        <StatsCard title="Total Savings" value="Frw 12,500,000" icon={DollarSign} />
        <StatsCard title="Total Loan Disbursed" value="Frw 8,750" icon={ArrowUpCircle} />
        <StatsCard title="Pending Requests" value="12" icon={Clock} />
      </div>
    </div>
  );
};

export default DashboardStats;

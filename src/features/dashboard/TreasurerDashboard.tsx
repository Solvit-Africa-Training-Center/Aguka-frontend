// ✅ pages/dashboard/TreasurerDashboard.tsx
import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import StatCard from "@components/dashboard/TreasurerComponents/StatCard";
import TransactionList from "@components/dashboard/TreasurerComponents/TransactionList";

const TreasurerDashboard: React.FC = () => {
  return (
    <div className="p-10 bg-[#003B42] min-h-screen text-white font-poppins pt-50">
      {/* Stats */}
      <div className="flex justify-between px-70">
        <StatCard
          title="Total contribution"
          amount="Frw 2,450,000"
          change="+12.5%"
          isPositive
        />
        <StatCard
          title="Total loan"
          amount="Frw 850,000"
          change="+5.2%"
          isPositive
        />
        <StatCard
          title="Total Dividend"
          amount="Frw 125,000"
          change="-2.1%"
          isPositive={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TransactionList />
        <div className="font-poppins text-[#b2b2b2] mt-17 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl p-4">
          <h2 className="text-left ml-10 text-3xl capitalize p-2 text-[#F9A825] font-bold">
            community feeds
          </h2>
          <div>
            <CommunityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasurerDashboard;

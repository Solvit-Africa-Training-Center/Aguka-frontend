
// import Sidebar from "@components/PresidentComponents/Sidebar";
import Header from "@components/PresidentComponents/Header";
import StatsCard from "@components/PresidentComponents/StatsCard";
import LineChart from "@components/PresidentComponents/LineChart";
import BarChart from "@components/PresidentComponents/BarChart";
import GroupPerformance from "@components/PresidentComponents/GroupPerformance";
import ApprovalCard from "@components/PresidentComponents/ApprovalCard";
import Notifications from "@components/PresidentComponents/Notifications";
import { Clock, DollarSign, Users, ArrowUpCircle  } from "lucide-react";

const PresidentDashboard = () => {
  return (
    <div className="flex bg-[#003B42] min-h-screen text-white">
      {/* <Sidebar /> */}
      <div className="flex-1 p-4 space-y-6">
        <Header />
      <div className=" pt-15 px-10 grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
         <StatsCard title="Total Members" value="247" icon={Users} />
      <StatsCard title="Total Savings" value="Frw 12,500,000" icon={DollarSign} />
      <StatsCard title="Total loan disbursed" value="Frw 8,750" icon={ArrowUpCircle} />
      <StatsCard title="Pending Request" value="12" icon={Clock}/>
    </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LineChart />
          <BarChart />
        </div>

        <GroupPerformance />

        <div>
          <h3 className="text-2xl font-bold mb-2">Approval & Decisions</h3>
          <ApprovalCard name="Samuel Nkurunziza" type="Business expansion loan" amount="50,000" time="15 Jun 13:00" />
          <ApprovalCard name="Alice Mukamana" type="Application to join saving circle" time="15 Jun 12:45" />
          <ApprovalCard name="Devid Rwigema" type="Emergency medical expenses loan" amount="50,000" time="15 Jun 12:30" />
          <ApprovalCard name="Beatrice Nyirahabimana" type="Application to join saving circle" time="15 Jun 11:15" />
        </div>

        <Notifications />
      </div>
    </div>
  );
};

export default PresidentDashboard;

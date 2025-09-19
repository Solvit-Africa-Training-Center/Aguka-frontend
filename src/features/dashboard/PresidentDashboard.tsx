import StatsCard from "@components/dashboard/PresidentComponents/StatsCard";
import LineChart from "@components/dashboard/PresidentComponents/LineChart";
import BarChart from "@components/dashboard/PresidentComponents/BarChart";
import GroupPerformance from "@components/dashboard/PresidentComponents/GroupPerformance";
import Notifications from "@components/dashboard/PresidentComponents/Notifications";
import { Clock, DollarSign, Users, ArrowUpCircle } from "lucide-react";
import MeetingAgenda from "@components/dashboard/PresidentComponents/MeetingAgenda";

const PresidentDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Members" value="247" icon={Users} />
        <StatsCard
          title="Total Savings"
          value="Frw 12,500,000"
          icon={DollarSign}
        />
        <StatsCard
          title="Total Loan Disbursed"
          value="Frw 8,750"
          icon={ArrowUpCircle}
        />
        <StatsCard title="Pending Requests" value="12" icon={Clock} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <LineChart />
        <BarChart />
      </div>

      {/* Group + Agenda */}
      <div className="grid md:grid-cols-2 gap-6">
        <GroupPerformance />
        <MeetingAgenda />
      </div>

      {/* Notifications */}
      <Notifications />
    </div>
  );
};

export default PresidentDashboard;

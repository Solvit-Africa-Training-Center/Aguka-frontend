import LineChart from "@components/dashboard/PresidentComponents/LineChart";
import BarChart from "@components/dashboard/PresidentComponents/BarChart";
import GroupPerformance from "@components/dashboard/PresidentComponents/GroupPerformance";
import MeetingAgenda from "@components/dashboard/PresidentComponents/MeetingAgenda";
import DoughnutChart from "@components/dashboard/PresidentComponents/DoughnutChart";
import CommunityFeedPres from "@components/dashboard/PresidentComponents/CommunityFeedPres";
import DashboardStats from "@components/dashboard/PresidentComponents/DashboardStats";

const PresidentDashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-10">
      {/* Stats + Charts Section */}
      <section className="space-y-4">
        <DashboardStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LineChart />
          <BarChart />
        </div>
      </section>

      {/* Group Performance + Agenda Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GroupPerformance />
        <MeetingAgenda />
      </section>

      {/* Doughnut Chart + Community Feed Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutChart />
        <CommunityFeedPres />
      </section>

      {/* Footer */}
      <footer className="w-full text-accent-100 py-6">
        <hr className="border-[#DCE4E5] mb-4" />
        <div className="text-sm text-center capitalize">
          &copy; 2025 Aguka. All rights reserved. Building wealth through
          community.
        </div>
      </footer>
    </div>
  );
};

export default PresidentDashboard;

import LineChart from "@components/dashboard/PresidentComponents/LineChart";
import BarChart from "@components/dashboard/PresidentComponents/BarChart";
import GroupPerformance from "@components/dashboard/PresidentComponents/GroupPerformance";
import MeetingAgenda from "@components/dashboard/PresidentComponents/MeetingAgenda";
import DoughnutChart from "@components/dashboard/PresidentComponents/DoughnutChart";
import CommunityFeedPres from "@components/dashboard/PresidentComponents/CommunityFeedPres";
import DashboardStats from "@components/dashboard/PresidentComponents/DashboardStats";

const PresidentDashboard = () => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Stats + Charts Section */}
      <section className="space-y-4">
        <DashboardStats />

        {/* Charts: stacked on small screens, two-column on large */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-transparent rounded-2xl p-4 h-64 md:h-80 shadow-sm overflow-hidden">
            <LineChart />
          </div>

          <div className="bg-transparent rounded-2xl p-4 h-64 md:h-80 shadow-sm overflow-hidden">
            <BarChart />
          </div>
        </div>
      </section>

      {/* Group Performance + Agenda Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-transparent rounded-2xl p-4 shadow-sm">
          <GroupPerformance />
        </div>

        <div className="bg-transparent rounded-2xl p-4 shadow-sm">
          <MeetingAgenda />
        </div>
      </section>

      {/* Doughnut Chart + Community Feed Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-transparent rounded-2xl p-4 flex items-center justify-center h-56 md:h-72 shadow-sm">
          <DoughnutChart />
        </div>

        <div className="bg-transparent rounded-2xl p-4 shadow-sm h-72 md:h-96 overflow-auto">
          <CommunityFeedPres />
        </div>
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

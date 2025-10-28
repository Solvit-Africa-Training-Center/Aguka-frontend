import AdminNavbar from "@components/dashboard/admin/AdminNavbar";
import { HiUsers } from "react-icons/hi";
import { TbWaveSawTool } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import { LuShield } from "react-icons/lu";
import AdminTrendChart from "@components/dashboard/admin/AdminTrendChart";
import RecentActivities from "@components/dashboard/admin/RecentActivities";
import CurrentStatistics from "@components/dashboard/admin/CurrentStatics";

import { useGetAdminOverviewQuery } from "@services/api/adminApi";

const AdminDashboard = () => {
  const { data: overview, isLoading, isError } = useGetAdminOverviewQuery();
  console.log(overview);
  const cards = [
    {
      title: "Total Users",
      icon: (
        <HiUsers className="w-11 h-11 bg-[#005159] p-2 rounded-full text-secondary-300" />
      ),

      value: overview?.data.totalUsers ?? "--",
      subtitle: "Users in the system",
    },
    {
      title: "Total Groups",
      icon: (
        <TbWaveSawTool className="w-11 h-11 p-2 rounded-full text-[#006D75]" />
      ),

      value: overview?.data.totalGroups ?? "--",
      subtitle: "Registered groups",
    },
    {
      title: "Users per Group",
      icon: (
        <LuShield className="w-11 h-11 p-2 rounded-full text-secondary-300" />
      ),
      value: overview?.data.usersPerGroup?.length ?? "--",
      subtitle: "Groups with users",
    },
    {
      title: "Group Presidents",
      icon: <GoAlert className="w-11 h-11 p-2 rounded-full text-[#E53935]" />,

      value: overview?.data?.groupStats
        ? overview.data.groupStats.filter((g) => g.president !== null).length
        : "--",
      subtitle: "Presidents with contacts",
    },
  ];

  if (isLoading) {
    return (
      <div className="font-poppins bg-[#003B42] min-h-screen text-white p-6">
        <AdminNavbar />
        <div className="pt-24 text-lg sm:text-2xl">
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="font-poppins bg-[#003B42] min-h-screen text-white">
        <AdminNavbar />
        <div className="pt-24 text-red-500 text-lg sm:text-2xl">
          Failed to load admin dashboard data.
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#003B42] min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <AdminNavbar />
      </div>

      <div className="pt-24 px-4 sm:px-6 md:px-10 text-white pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl capitalize font-bold">
          Admin dashboard
        </h1>
        <span className="capitalize text-xs sm:text-sm text-gray-200">
          system administration and security monitoring
        </span>
      </div>

      <div className="px-4 sm:px-6 md:px-10 pb-6">
        {/* Cards - horizontal scroll on small screens, grid on md+ */}
        <div className="flex gap-4 md:grid md:grid-cols-4 lg:grid-cols-4 overflow-x-auto md:overflow-visible py-2">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[240px] md:min-w-0 bg-[#002f32] rounded-md p-4 space-y-4 border border-secondary-300 shadow-md flex-shrink-0 md:flex-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="capitalize text-sm md:text-lg font-medium text-gray-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-2xl md:text-3xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-stone-400">{item.subtitle}</p>
                </div>
                <div className="shrink-0">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Charts and Activity - stack on small screens */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6 px-0 md:px-0">
          <div className="w-full lg:w-2/3 bg-transparent">
            <AdminTrendChart />
          </div>
          <div className="w-full lg:w-1/3">
            <RecentActivities />
          </div>
        </div>

        {/* Current statistics */}
        <div className="mt-8 px-0 md:px-0">
          <CurrentStatistics />
        </div>

        {/* Footer */}
        <div className="w-full text-accent-100 p-5 mt-8">
          <div className="max-w-4xl mx-auto">
            <hr className="border-t border-accent-100/30" />
            <div className="text-sm text-center pt-4 text-gray-200 capitalize">
              <span>
                &copy; 2025 Aguka. All rights reserved. Building wealth through
                community.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

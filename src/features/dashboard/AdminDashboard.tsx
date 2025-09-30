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
      <div className="font-poppons bg-[#003B42] min-h-screen text-white p-10">
        <AdminNavbar />
        <div className="pt-45 text-2xl">Loading admin dashboard...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="font-poppons bg-[#003B42] min-h-screen text-white ">
        <AdminNavbar />
        <div className="pt-45 text-red-500 text-2xl">
          Failed to load admin dashboard data.
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppons bg-[#003B42] min-h-screen ">
      <div className="fixed z-10">
        <AdminNavbar />
      </div>

      <div className="pt-45 pl-10 text-white pb-10">
        <h1 className="text-4xl capitalize font-bold">Admin dashboard</h1>
        <span className="capitalize text-sm">
          system administration and security monitoring
        </span>
      </div>

      <div className="flex gap-10 overflow-x-auto text-white ml-15 mr-15 scrollbar-hide ">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[280px] h-50 rounded-md p-4 space-y-5 border border-secondary-300 shadow-[-3px_3px_2px_2px_#F9A825] flex-shrink-0">
            <div className="flex justify-between capitalize text-2xl">
              <span>{item.title}</span>
              {item.icon}
            </div>
            <div className="text-xl text-white grid">
              <span className="text-center text-3xl font-bold">
                {item.value}
              </span>
              <span className="text-left mt-7 text-stone-400 text-xl">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-20">
        <AdminTrendChart />
        <RecentActivities />
      </div>

      <div className="place-items-center p-15">
        <CurrentStatistics />
      </div>

      <div className="w-full text-accent-100 p-5 relative">
        <hr className="w-300 text-center absolute left-70" />
        <div className="text-sm text-center pt-15 capitalize">
          <span>
            &copy; 2025 Aguka. All rights reserved. Building Wealth through
            community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

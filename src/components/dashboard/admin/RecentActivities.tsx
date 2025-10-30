import React from "react";
import { ListChecks, Megaphone } from "lucide-react";
import { useGetUsersQuery } from "@services/api/UserApi";
import { useGetGroupsQuery } from "@services/api/groupApi";
import type { User } from "types/User";
import type { Group } from "types/auth";

interface Activity {
  time: string;
  title: string;
  user?: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
}

const RecentActivities: React.FC = () => {
  const { data: usersResponse } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 10000,
  });

  const { data: groupsResponse } = useGetGroupsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 10000,
  });

  const userList: User[] = Array.isArray(usersResponse)
    ? usersResponse
    : Array.isArray((usersResponse as any)?.data)
    ? (usersResponse as any).data
    : [];

  const groupList: Group[] = Array.isArray(groupsResponse)
    ? groupsResponse
    : Array.isArray((groupsResponse as any)?.data)
    ? (groupsResponse as any).data
    : [];

  const userActivities: Activity[] = userList
    .filter((u) => u.createdAt)
    .slice(-5)
    .map((u) => ({
      time: new Date(u.createdAt!).toLocaleString(),
      title: "New User Registered",
      user: u.name,
      description: `User joined the system`,
      icon: <ListChecks className="w-6 h-6 text-white" />,
      color: "bg-yellow-600",
    }));

  const groupActivities: Activity[] = groupList
    .filter((g) => g.createdAt)
    .slice(-5)
    .map((g) => ({
      time: new Date(g.createdAt!).toLocaleString(),
      title: "New Group Created",
      user: g.user?.name || "President",
      description: `Group "${g.name}" was added`,
      icon: <Megaphone className="w-6 h-6 text-white" />,
      color: "bg-cyan-600",
    }));

  const activities = [...userActivities, ...groupActivities].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="w-full text-white max-w-[95vw] sm:max-w-[85vw] md:max-w-[600px] mx-auto mt-4 sm:mt-6 md:mt-8">
      {/* Title outside border */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">
        Recent Activities
      </h2>

      {/* Scrollable box */}
      <div className="p-3 sm:p-4 md:p-5 rounded-lg border border-secondary-400 bg-primary-400/95 backdrop-blur-sm max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] overflow-y-auto scrollbar-hide space-y-3 sm:space-y-4 shadow-lg">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 hover:bg-white/5 rounded-lg transition-colors"
          >
            <p className="text-[#929292] text-xs sm:text-sm md:text-base min-w-[80px] sm:min-w-[90px] md:min-w-[100px]">
              {activity.time}
            </p>
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full ${activity.color} shadow-md`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                {activity.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl truncate">
                {activity.title}
              </h3>
              {activity.user && (
                <p className="text-sm sm:text-base md:text-lg text-[#F4F4F4]">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  <span className="text-xs sm:text-sm text-[#929292]">
                    {activity.description}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetUsersQuery } from "@services/api/UserApi";
import { useGetGroupsQuery } from "@services/api/groupApi";
import type { User } from "types/User";
import type { Group } from "types/auth";

const CurrentStatistics: React.FC = () => {
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

  const totalUsers = userList.length;
  const totalGroups = groupList.length;

  const activeUsers = userList.some((u) => "isActive" in u)
    ? userList.filter((u: any) => u.isActive).length
    : totalUsers;

  const usage =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  const maxVal = Math.max(totalUsers, totalGroups, 1);
  const toPercent = (val: number) => Math.round((val / maxVal) * 100);

  const data = [
    {
      name: "Users",
      value: toPercent(totalUsers),
      raw: totalUsers,
      fill: "#BB7E1C",
    },
    {
      name: "Groups",
      value: toPercent(totalGroups),
      raw: totalGroups,
      fill: "#327835",
    },
    { name: "Usage", value: usage, raw: `${usage}%`, fill: "#009AAA" },
  ];

  return (
    <div className="flex justify-center items-center w-full p-3 sm:p-4 md:p-6">
      <div className="text-white border border-neutral-400 rounded-lg bg-primary-400/95 w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] p-3 sm:p-4 md:p-6 backdrop-blur-sm shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center capitalize mb-2 sm:mb-4 md:mb-6">
          Current Statistics
        </h2>

        <div className="h-[250px] sm:h-[300px] md:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius={window.innerWidth < 640 ? "25%" : "30%"}
              outerRadius={window.innerWidth < 640 ? "90%" : "120%"}
              startAngle={90}
              endAngle={-270}
              barSize={window.innerWidth < 640 ? 12 : 15}
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                background
                cornerRadius={5}
                animationBegin={200}
                animationDuration={1500}
              />

              <Legend
                iconSize={window.innerWidth < 640 ? 15 : 20}
                iconType="circle"
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  top: window.innerWidth < 640 ? 260 : 320,
                  outline: "none",
                  paddingTop: "1rem",
                }}
                formatter={(value: string, entry: any) => (
                  <span className="text-white text-sm sm:text-base md:text-lg pl-2 sm:pl-3 md:pl-4">
                    {value} ({entry.payload.raw})
                  </span>
                )}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CurrentStatistics;

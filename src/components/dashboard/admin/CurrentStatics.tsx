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
  // ✅ Fetch live data
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

  // ✅ Handle both array or { data: [] } response
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

  // ✅ Calculate values
  const totalUsers = userList.length;
  const totalGroups = groupList.length;

  // Usage = percentage of active users
  const activeUsers = userList.some(u => "isActive" in u) 
    ? userList.filter((u: any) => u.isActive).length 
    : totalUsers;

  const usage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  // ✅ Normalize other values to percentage scale for chart
  const maxVal = Math.max(totalUsers, totalGroups, 1);
  const toPercent = (val: number) => Math.round((val / maxVal) * 100);

  const data = [
    { name: "Users", value: toPercent(totalUsers), raw: totalUsers, fill: "#BB7E1C" },
    { name: "Groups", value: toPercent(totalGroups), raw: totalGroups, fill: "#327835" },
    { name: "Usage", value: usage, raw: `${usage}%`, fill: "#009AAA" },
  ];

  return (
    <div className="flex justify-center items-center w-full pb-20">
      <div className="grid text-white border border-neutral-400 rounded-lg bg-primary-400 w-full md:w-200 h-auto md:h-150 p-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center capitalize mt-5 md:mt-10">
          Current Statistics
        </h2>

        <div className="h-80 w-full">
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="30%"
              outerRadius="120%"
              startAngle={90}
              endAngle={-270}
              barSize={15}
              data={data}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" background cornerRadius={5} />

              <Legend
                iconSize={20}
                iconType="circle"
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ top: 320, outline: "none" }}
                formatter={(value: string, entry: any) => (
                  <span className="text-white pl-2 md:pl-5">
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

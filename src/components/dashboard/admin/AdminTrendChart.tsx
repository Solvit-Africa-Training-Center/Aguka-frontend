import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetUsersQuery } from "@services/api/UserApi";
import type { User } from "types/User";

// Helper to get last 7 days as strings: "YYYY-MM-DD"
const getLast7Days = (): string[] => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }
  return days;
};

const AdminTrendChart: React.FC = () => {
  const { data: usersResponse } = useGetUsersQuery(undefined, {
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

  const last7Days = getLast7Days();

  const data = last7Days.map(date => {
    const dailyUsers = userList.filter(
      u => u.createdAt?.startsWith(date) // Adjust field if different
    ).length;
    return { date, users: dailyUsers };
  });

  return (
    <div className="p-6 text-white w-full md:w-200 mt-10 ml-10 font-poppins">
      <div className="ml-5 md:ml-15">
        <h2 className="text-4xl font-bold">System Usage Trends</h2>
        <p className="text-gray-300">New users per day (last 7 days)</p>
      </div>
      <div className="mt-6 h-100 w-full border border-neutral-400 rounded-lg outline-none p-4 md:p-10">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#fff" }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#F9A825"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminTrendChart;

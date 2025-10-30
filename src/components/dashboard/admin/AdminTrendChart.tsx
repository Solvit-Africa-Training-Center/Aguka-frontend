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
    <div className="p-3 sm:p-4 md:p-6 text-white w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] mx-auto mt-4 sm:mt-6 md:mt-10 font-poppins">
      <div className="space-y-1 sm:space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">System Usage Trends</h2>
        <p className="text-gray-300 text-sm sm:text-base text-center sm:text-left">New users per day (last 7 days)</p>
      </div>
      <div className="mt-4 sm:mt-5 md:mt-6 h-[300px] sm:h-[400px] md:h-[500px] w-full border border-neutral-400 rounded-lg outline-none p-3 sm:p-4 md:p-6 bg-[#003B42]/50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              stroke="#ccc" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#ccc"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#003B42', 
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              labelStyle={{ color: '#ccc' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#fff", fontSize: "12px" }}>{value}</span>
              )}
              wrapperStyle={{ paddingTop: '10px' }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#F9A825"
              strokeWidth={2}
              dot={{ stroke: '#F9A825', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: '#F9A825', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminTrendChart;

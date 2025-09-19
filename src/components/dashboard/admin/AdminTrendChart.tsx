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

const data = [
  { date: "2024-01-01", users: 140, transactions: 160 },
  { date: "2024-01-02", users: 170, transactions: 200 },
  { date: "2024-01-03", users: 160, transactions: 180 },
  { date: "2024-01-04", users: 180, transactions: 200 },
  { date: "2024-01-05", users: 190, transactions: 230 },
  { date: "2024-01-06", users: 170, transactions: 190 },
];

const AdminTrendChart: React.FC = () => {
  return (
    <div className=" p-6 text-white w-200  mt-10 ml-10 font-poppins">
        <div className="ml-15">
      <h2 className="text-4xl font-bold">System usage Trends</h2>
      <p className="text-gray-300">Daily active users and transaction</p>
</div>
      <div className="mt-6 h-100 w-full border border-neutral-400 rounded-lg outline-none p-10">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
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
              stroke="#E2E8F0"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#FACC15"
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

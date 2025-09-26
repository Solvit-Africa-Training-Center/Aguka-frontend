import React, { useMemo } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetGroupContributionsQuery } from "@services/api/ContributionApi";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { Contribution } from "@models/Contribution";

const MyLineChart: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId || "";

  // Fetch contributions for this group
  const { data: contributionsData = [] } =
    useGetGroupContributionsQuery(currentGroupId);

  // Prepare chart data grouped by month
  const chartData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Initialize monthly contribution totals
    const monthlyTotals = months.map((month) => ({
      month,
      contribution: 0,
    }));

    contributionsData.forEach((contribution: Contribution) => {
      const date = new Date(contribution.contributionDate);
      const monthIndex = date.getMonth();
      monthlyTotals[monthIndex].contribution += Number(contribution.amount);
    });

    return monthlyTotals;
  }, [contributionsData]);

  return (
    <div>
      <h3 className="text-3xl text-[#F9A825] text-center mb-4 mt-5">
        Monthly Contribution
      </h3>
      <h4 className="text-xl text-white text-center mb-4">
        Contribution trends over time
      </h4>
      <ResponsiveContainer width="100%" height={350}>
        <ReLineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `${(value / 1000).toLocaleString()}K`}
          />
          <Tooltip
            formatter={(value: number) =>
              `Frw ${new Intl.NumberFormat().format(value)}`
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="contribution"
            stroke="#22c55e"
            fill="rgba(34,197,94,0.3)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;

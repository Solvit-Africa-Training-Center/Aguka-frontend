// LineChart.tsx
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
import { useGetGroupContributionsTodayQuery } from "@services/api/ContributionApi";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { Contribution } from "@models/Contribution";

const MyLineChart: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId || "";

  const { data: rawData } = useGetGroupContributionsTodayQuery(currentGroupId);

  const contributionsData: Contribution[] = useMemo(() => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray((rawData as any).data)) return (rawData as any).data;
    return [];
  }, [rawData]);

  const chartData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyTotals = months.map((month) => ({ month, contribution: 0 }));

    contributionsData.forEach((contribution) => {
      if (!contribution.contributionDate) return; // skip invalid dates
      const date = new Date(contribution.contributionDate);
      if (isNaN(date.getTime())) return; // skip invalid dates

      const monthIndex = date.getMonth();
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyTotals[monthIndex].contribution += Number(contribution.amount) || 0;
      }
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

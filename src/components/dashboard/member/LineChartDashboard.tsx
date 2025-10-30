// LineChartDashboard.tsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";

interface LineChartDashboardProps {
  title?: string;
  subtitle?: string;
  lineColor?: string;
}

interface Contribution {
  contributionDate: string;
  amount: number;
}

const CustomYAxisTick = ({ x, y, payload }: any) => {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
  const fontSize = isSmall ? 10 : 12;
  return (
    <text x={x - 10} y={y + 5} fill="#fff" fontSize={fontSize} textAnchor="end">
      {Number(payload.value).toLocaleString()}
    </text>
  );
};

const LineChartDashboard: React.FC<LineChartDashboardProps> = ({
  title = "Contribution trends",
  subtitle,
  lineColor = "#fff",
}) => {
  const { data, isLoading, isError } = useGetContributionsByUserQuery();

  const chartData = useMemo(() => {
    const items: Contribution[] = Array.isArray(data) ? (data as Contribution[]) : [];

    const monthlyMap: Record<number, number> = {};
    items.forEach((c) => {
      const date = new Date(c.contributionDate);
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth(); // 0 = Jan, ..., 11 = Dec
        monthlyMap[monthIndex] = (monthlyMap[monthIndex] || 0) + (c.amount || 0);
      }
    });

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return months.map((m, i) => ({
      month: m,
      contribution: monthlyMap[i] || 0,
    }));
  }, [data]);

  if (isLoading) return <p className="text-white">Loading chart...</p>;
  if (isError) return <p className="text-red-500">Failed to load contributions</p>;

  return (
    <div
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] p-3 sm:p-4 md:p-5 rounded-lg bg-primary-400/20 backdrop-blur-sm"
      tabIndex={-1}
      style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-gray-200">{subtitle}</p>}
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            bottom: 5,
            left: typeof window !== "undefined" && window.innerWidth < 640 ? 40 : 50,
          }}
          style={{ outline: "none" }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="1 3" opacity={0.1} />
          <XAxis
            dataKey="month"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 14, fontWeight: 500 }}
          />
          <YAxis
            stroke="#fff"
            tick={<CustomYAxisTick />}
            domain={[0, "dataMax + 5000"]}
            width={typeof window !== "undefined" && window.innerWidth < 640 ? 50 : 60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(26, 55, 77, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "8px 12px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff", fontWeight: 500 }}
          />
          <Line
            type="monotone"
            dataKey="contribution"
            stroke={lineColor}
            strokeWidth={typeof window !== "undefined" && window.innerWidth < 640 ? 1.5 : 2}
            dot={{ r: typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 4, strokeWidth: 1, fill: "#fff" }}
            activeDot={{ r: typeof window !== "undefined" && window.innerWidth < 640 ? 5 : 6, strokeWidth: 2, stroke: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartDashboard;

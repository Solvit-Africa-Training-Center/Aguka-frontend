// LineChartDashboard.tsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";

interface ChartData {
  month: string;
  contribution: number;
}

interface LineChartDashboardProps {
  title?: string;
  subtitle?: string;
  lineColor?: string;
}

const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text
    x={x - 20}
    y={y + 5}
    textAnchor="end"
    fill="#fff"
    fontSize={14}
    fontWeight={500}
  >
    {payload.value.toLocaleString()}
  </text>
);

const LineChartDashboard: React.FC<LineChartDashboardProps> = ({
  title = "Contribution trends",
  subtitle = "Your monthly contribution over the past year",
  lineColor = "#fff",
}) => {
  const { data, isLoading, isError } = useGetContributionsByUserQuery();

  // Aggregate contributions per month
  const chartData: ChartData[] = useMemo(() => {
    if (!data) return [];

    const monthlyMap: Record<number, number> = {};

    data.forEach((c) => {
      const date = new Date(c.contributionDate);
      const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
      monthlyMap[monthIndex] = (monthlyMap[monthIndex] || 0) + c.amount;
    });

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return months.map((m, i) => ({
      month: m,
      contribution: monthlyMap[i] || 0,
    }));
  }, [data]);

  console.log("Chart data:", chartData); // ✅ debug

  if (isLoading) return <p className="text-white">Loading chart...</p>;
  if (isError) return <p className="text-red-500">Failed to load contributions</p>;

  return (
   <div
  className="w-full h-150 p-4 rounded-lg" // increased height
  tabIndex={-1}
  style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
>

      <h2 className="text-4xl font-bold text-white mb-1">{title}</h2>
      <p className="text-sm text-gray-200 mb-4">{subtitle}</p>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, bottom: 5, left: 50 }}
          style={{ outline: "none" }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="1 3" />
          <XAxis
            dataKey="month"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 14, fontWeight: 500 }}
          />
          <YAxis
            stroke="#fff"
            tick={<CustomYAxisTick />}
            domain={[0, "dataMax + 5000"]} // dynamic scaling
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a374d",
              border: "none",
              padding: "10px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="contribution"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4 }} // shows points
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartDashboard;

// LineChartDashboard.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  contribution: number;
}

interface LineChartDashboardProps {
  data: ChartData[];
  title?: string;
  subtitle?: string;
  lineColor?: string;
}

// Custom Y-axis tick component
const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text
    x={x - 10}
    y={y + 5}
    textAnchor="end"
    className="text-white text-sm font-medium">
    {payload.value.toLocaleString()} {/* adds comma separators */}
  </text>
);

const LineChartDashboard: React.FC<LineChartDashboardProps> = ({
  data,
  title = "Contribution trends",
  subtitle = "Your monthly contribution over the past year",
  lineColor = "#fff",
}) => {
  return (
    <div className={`w-200 h-180 p-4 rounded-lg`}>
      <h2 className="text-4xl font-bold text-white mb-1 ">{title}</h2>
      <p className="text-sm text-gray-200 mb-4">{subtitle}</p>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="1 3" />
          <XAxis
            dataKey="month"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 14, fontWeight: 500 }}
          />
          <YAxis
            stroke="#fff"
            
            tick={<CustomYAxisTick />}
            domain={[500, 300000]} // min: 500, max: 300,000
            ticks={[500, 5000, 10000, 50000, 100000, 200000, 300000]} // custom tick numbers
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a374d",
              border: "none",
              padding:"10px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="contribution"
            stroke={lineColor}
            strokeWidth={2}
            
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartDashboard;

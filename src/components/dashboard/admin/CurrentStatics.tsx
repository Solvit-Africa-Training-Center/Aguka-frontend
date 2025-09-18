import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Distribution", value: 85, fill: "#06b6d4" }, // cyan
  { name: "Profit", value: 60, fill: "#d97706" }, // amber
  { name: "Loans Provided", value: 35, fill: "#15803d" }, // green
];

const CurrentStatistics: React.FC = () => {
  return (
    <div className="items-center justify-center pb-20 ">
    <div className=" grid text-white border border-neutral-400 rounded-lg    w-200 h-150">
      <h2 className="text-2xl font-bold text-center mb-6">
        Current Statistics
      </h2>
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="30%"
            outerRadius="120%"
            barSize={25}
            data={data}
            startAngle={180}
            endAngle={0}>
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar background dataKey="value" cornerRadius={15} />

            <Legend
              iconSize={25}
              layout="vertical"
              verticalAlign="bottom"
              align="center"
              formatter={(value: string, entry: any) => (
                <span className="text-white">
                  {value} ({entry.payload.value}%)
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

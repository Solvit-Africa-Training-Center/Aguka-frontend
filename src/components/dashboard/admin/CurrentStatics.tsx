import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Profit", value: 100, fill: "#BB7E1C" }, 
  { name: "Distribution", value: 80, fill: "#327835" }, 
  { name: "Loans Provided", value: 65, fill: "#009AAA" }, 
];

const CurrentStatistics: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="grid text-white border border-neutral-400 rounded-lg bg-primary-400 w-200 h-150">
        <h2 className="text-4xl font-bold text-center capitalize mt-10">
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
              data={data}>
              <PolarAngleAxis
                type="number"
                domain={[0, 100]} // values are percentages
                angleAxisId={0}
                tick={false}
              />
              <RadialBar dataKey="value" background cornerRadius={5} />

              <Legend
                iconSize={25}
                iconType="circle"
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  top: 320,
                  outline: "none", 
                }}
                formatter={(value: string, entry: any) => (
                  <span className="text-white pl-5">
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

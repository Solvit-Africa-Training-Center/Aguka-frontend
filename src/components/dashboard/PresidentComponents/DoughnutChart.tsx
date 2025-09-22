import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Contributions", value: 400 },
  { name: "Loan Repayments", value: 300 },
  { name: "Meeting Attendance", value: 200 },
];

const COLORS = ["#006C77", "#F9A825", "#F4F4F4"];

const DoughnutChart = () => {
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col items-start gap-2 mt-10 max-w-full max-h-[650px]">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white text-sm md:text-base">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#003B42] p-6 rounded-2xl shadow-lg w-full font-poppins max-h-[550px] border-r-4 border-b-4 border-[#DCE4E5]">
      <h3 className="text-2xl md:text-3xl font-bold text-[#F9A825] mb-5 text-center">
        Group Performance Metrics
      </h3>
      <h4 className="text-white text-sm md:text-lg mb-10 text-center">
        Key performance indicators
      </h4>

      <div className="flex justify-center max-h-[450px] px-2 md:px-10">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={5}
              label={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number, name: string) => [`${value}`, name]} />
            <Legend content={renderLegend} layout="vertical" verticalAlign="bottom" align="left" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoughnutChart;

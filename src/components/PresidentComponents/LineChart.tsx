
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", contribution: 100000 },
  { month: "Feb", contribution: 200000 },
  { month: "Mar", contribution: 150000 },
  { month: "Apr", contribution: 250000 },
  { month: "May", contribution: 200000 },
  { month: "Jun", contribution: 300000 },
  { month: "Jul", contribution: 280000 },
  { month: "Aug", contribution: 320000 },
];

const MyLineChart = () => {
  return (
    <div>
        <h3 className="text-4xl font-semibold text-center mb-4">Monthly Contribution</h3>
        <h4 className="text-xl font-semibold text-center mb-4">Contribution trends over time </h4>
    <ResponsiveContainer width="100%" height={400}>
      <ReLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="contribution" stroke="#22c55e" fill="rgba(34,197,94,0.3)" />
      </ReLineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;

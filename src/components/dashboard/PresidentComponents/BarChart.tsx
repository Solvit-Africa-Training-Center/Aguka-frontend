import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Repayments: 50000, Disbursements: 30000 },
  { month: "Feb", Repayments: 70000, Disbursements: 50000 },
  { month: "Mar", Repayments: 60000, Disbursements: 40000 },
  { month: "Apr", Repayments: 90000, Disbursements: 70000 },
  { month: "May", Repayments: 80000, Disbursements: 60000 },
  { month: "Jun", Repayments: 100000, Disbursements: 80000 },
  { month: "Jul", Repayments: 90000, Disbursements: 70000 },
  { month: "Aug", Repayments: 120000, Disbursements: 100000 },
];

const MyBarChart = () => {
  return (
    <div>
      <h3 className="text-3xl text-[#F9A825] text-center mb-4 mt-5">Loan Activities</h3>
      <h4 className="text-xl text-center text-white mb-4">
        Disbursement vs repayments
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `${value / 1000}K`} // format Y-axis as K
          />
          <Tooltip
            formatter={(value: number) => `${value / 1000}K`} // format tooltip
          />
          <Legend />
          <Bar dataKey="Repayments" fill="#9E92FE" barSize={20} />
          <Bar dataKey="Disbursements" fill="#FCA6A0" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;

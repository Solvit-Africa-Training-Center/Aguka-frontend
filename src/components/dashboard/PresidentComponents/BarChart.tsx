
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", Repayments: 50, Disbursements: 30 },
  { month: "Feb", Repayments: 70, Disbursements: 50 },
  { month: "Mar", Repayments: 60, Disbursements: 40 },
  { month: "Apr", Repayments: 90, Disbursements: 70 },
  { month: "May", Repayments: 80, Disbursements: 60 },
  { month: "Jun", Repayments: 100, Disbursements: 80 },
  { month: "Jul", Repayments: 90, Disbursements: 70 },
  { month: "Aug", Repayments: 120, Disbursements: 100 },
];

const MyBarChart = () => {
  return (
    <div>
        <h3 className="text-4xl font-semibold text-center mb-4">Loan Activities</h3>
        <h4 className="text-xl font-semibold text-center mb-4">Disbursement vs repayments</h4>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Repayments" fill="#9E92FE" />
        <Bar dataKey="Disbursements" fill="#FCA6A0" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;

import React, { useMemo } from "react";
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
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi"; // if you have a repayments API

const MyBarChart: React.FC = () => {
  // Fetch approved loans
  const { data: loansData = [] } = useGetLoansByStatusQuery("approved");

  // Fetch repayments
  const { data: repaymentsData = [] } = useGetRepaymentsQuery();

  // Transform data to monthly totals
  const chartData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Initialize empty data for all months
    const monthlyData = months.map((month) => ({
      month,
      Repayments: 0,
      Disbursements: 0,
    }));

    // Sum disbursements by month
    loansData.forEach((loan: any) => {
      const date = new Date(loan.createdAt);
      const monthIndex = date.getMonth();
      const DEFAULT_RATE = 0.05;
      const duration = loan.durationMonths ?? 0;
      const totalPayable = loan.amount + loan.amount * DEFAULT_RATE * duration;
      monthlyData[monthIndex].Disbursements += totalPayable;
    });

    // Sum repayments by month
    repaymentsData.forEach((repayment: any) => {
      const date = new Date(repayment.date);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].Repayments += repayment.amount;
    });

    return monthlyData;
  }, [loansData, repaymentsData]);

  return (
    <div>
      <h3 className="text-3xl text-[#F9A825] text-center mb-4 mt-5">Loan Activities</h3>
      <h4 className="text-xl text-center text-white mb-4">
        Disbursement vs Repayments
      </h4>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => `${(value / 1000).toLocaleString()}K`}
          />
          <Tooltip
            formatter={(value: number) => `${(value / 1000).toLocaleString()}K`}
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

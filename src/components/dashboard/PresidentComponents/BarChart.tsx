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
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";

interface MonthlyData {
  month: string;
  Repayments: number;
  Disbursements: number;
}

interface Loan {
  id: string;
  userId: string;
  amount: number;
  durationMonths?: number;
  interestRate?: number;
  createdAt?: string;
  status?: string;
}

interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  paymentDate?: string;
  date?: string;
}

const MyBarChart: React.FC = () => {
  // Fetch approved loans
  const { data: loansData = [] } = useGetLoansByStatusQuery("approved");
  // Fetch repayments
  const { data: repaymentsData = [] } = useGetRepaymentsQuery();

  // Transform data to monthly totals
  const chartData: MonthlyData[] = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyData: MonthlyData[] = months.map((month) => ({
      month,
      Repayments: 0,
      Disbursements: 0,
    }));

    // Sum disbursements by month (principal + interest)
    (loansData as Loan[]).forEach((loan) => {
      if (!loan.createdAt) return;
      const monthIndex = new Date(loan.createdAt).getMonth();
      const amount = loan.amount ?? 0;
      const duration = loan.durationMonths ?? 0;
      const rate = loan.interestRate ?? 0.05;

      const totalPayable = amount + amount * rate * duration;
      monthlyData[monthIndex].Disbursements += totalPayable;
    });

    // Sum repayments by month
    (repaymentsData as Repayment[]).forEach((repayment) => {
      const repaymentDate = repayment.paymentDate || repayment.date;
      if (!repaymentDate) return;
      const monthIndex = new Date(repaymentDate).getMonth();
      monthlyData[monthIndex].Repayments += repayment.amount ?? 0;
    });

    return monthlyData;
  }, [loansData, repaymentsData]);

  return (
    <div>
      <h3 className="text-3xl text-[#F9A825] text-center mb-4 mt-5">
        Loan Activities
      </h3>
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
          <Bar dataKey="Disbursements" fill="#FCA6A0" barSize={20} />
          <Bar dataKey="Repayments" fill="#9E92FE" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;

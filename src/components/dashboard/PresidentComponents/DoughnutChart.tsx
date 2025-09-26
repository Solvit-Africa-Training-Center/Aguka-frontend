// DoughnutChart.tsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";
import type { Contribution } from "@models/Contribution";
import type { Loan } from "types/Loan";
import type { Repayment } from "types/Repayment";
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetGroupContributionsTodayQuery } from "@services/api/ContributionApi";
import { useGetLoansQuery } from "@services/api/loanApi";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";

const COLORS = ["#006C77", "#F9A825", "#F4F4F4"];

const DoughnutChart: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  if (!currentGroupId) return <div className="text-white">No group selected</div>;

  const todayStr = new Date().toISOString().split("T")[0];

  // Users
  const { data: usersData } = useGetUsersQuery();
  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData) ? usersData : Array.isArray((usersData as any).data) ? (usersData as any).data : [];
    return arr.filter((u: User) => u.groupId === currentGroupId);
  }, [usersData, currentGroupId]);

  // Contributions
  const { data: contributionsData } = useGetGroupContributionsTodayQuery(currentGroupId);
  const contributions: Contribution[] = useMemo(() => {
    if (!contributionsData) return [];
    return Array.isArray(contributionsData) ? contributionsData : Array.isArray((contributionsData as any).data) ? (contributionsData as any).data : [];
  }, [contributionsData]);

  // Loans
  const { data: loansData } = useGetLoansQuery();
  const loans: Loan[] = useMemo(() => {
    if (!loansData) return [];
    const allLoans = Array.isArray(loansData) ? loansData : Array.isArray((loansData as any).data) ? (loansData as any).data : [];
    return allLoans.filter((l: Loan) => users.some((u) => u.id === l.userId));
  }, [loansData, users]);

  // Repayments
  const { data: repaymentsData } = useGetRepaymentsQuery();
  const repayments: Repayment[] = useMemo(() => {
    if (!repaymentsData) return [];
    return Array.isArray(repaymentsData) ? repaymentsData : Array.isArray((repaymentsData as any).data) ? (repaymentsData as any).data : [];
  }, [repaymentsData]);

  // Total contributions
  const totalContributions = contributions.reduce((sum, c) => sum + Number(c.amount ?? 0), 0);

  // Total loan amounts
  const totalLoanAmount = loans.reduce((sum, l) => sum + Number(l.amount ?? 0), 0);

  // Total repaid amount
  const totalRepaid = loans.reduce((sum, loan) => {
    const repaymentsForLoan = repayments.filter((r) => r.loanId === loan.id);
    const totalLoanRepayment = repaymentsForLoan.reduce((s, r) => s + Number(r.amount ?? 0), 0);
    return sum + totalLoanRepayment;
  }, 0);

  // Loan repayment metric (percentage of loans repaid)
  const loanRepaymentMetric = totalLoanAmount > 0 ? (totalRepaid / totalLoanAmount) * 100 : 0;

  // Attendance (same logic as before)
  const userAttendanceScores = users.map((user) => {
    let score = 0;
    const contributed = contributions.some((c) => c.userId === user.id && c.contributionDate.startsWith(todayStr));
    if (contributed) score += 1;

    const repaidToday = repayments.some((r) => {
      const loan = loans.find((l) => l.id === r.loanId);
      return loan?.userId === user.id && r.paymentDate.startsWith(todayStr);
    });
    if (repaidToday) score += 1;

    return score; // 0, 1, or 2
  });
  const totalAttendanceScore = userAttendanceScores.reduce((sum, s) => sum + s, 0);
  const maxPossibleScore = users.length * 2;
  const attendanceMetric = maxPossibleScore > 0 ? (totalAttendanceScore / maxPossibleScore) * 100 : 0;

  const data = [
    { name: "Contributions", value: totalContributions },
    { name: "Loan Repayments", value: loanRepaymentMetric },
    { name: "Group Attendance", value: attendanceMetric },
  ];

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col items-start gap-2 mt-10 max-w-full max-h-[650px]">
        {payload?.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-white text-sm md:text-base">{entry.value?.toLocaleString?.()}</span>
          </div>
        )) || null}
      </div>
    );
  };

  return (
    <div className="bg-[#003B42] p-6 rounded-2xl shadow-lg w-full font-poppins max-h-[550px] border-r-4 border-b-4 border-[#DCE4E5]">
      <h3 className="text-2xl md:text-3xl font-bold text-[#F9A825] mb-5 text-center">Group Performance Metrics</h3>
      <h4 className="text-white text-sm md:text-lg mb-10 text-center">Key performance indicators</h4>
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
            <Tooltip formatter={(value: number, name: string) => [`${value?.toLocaleString?.()}`, name]} />
            <Legend content={renderLegend} layout="vertical" verticalAlign="bottom" align="left" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoughnutChart;

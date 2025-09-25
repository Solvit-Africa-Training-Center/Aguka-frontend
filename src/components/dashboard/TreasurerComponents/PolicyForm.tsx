import { useState, useEffect } from "react";
import { useCreatePolicyMutation, useGetPoliciesQuery } from "@services/api/policyApi";

const PolicyForm = () => {
  const { data: policies } = useGetPoliciesQuery();
  const [createPolicy, { isLoading, error }] = useCreatePolicyMutation();

  // LOAN_STANDARD
  const [loanRate, setLoanRate] = useState<number>(0.05);
  const [loanStandardId, setLoanStandardId] = useState<number | null>(null);

  // LOAN_OVERDUE
  const [overdueRate, setOverdueRate] = useState<number>(0.02);
  const [gracePeriod, setGracePeriod] = useState<number>(3);
  const [loanOverdueId, setLoanOverdueId] = useState<number | null>(null);

  // Populate form with existing policies
  useEffect(() => {
    if (policies) {
      const standard = policies.find((p: any) => p.type === "LOAN_STANDARD");
      const overdue = policies.find((p: any) => p.type === "LOAN_OVERDUE");

      if (standard) {
        setLoanRate(standard.rate);
        setLoanStandardId(standard.id);
      }

      if (overdue) {
        setOverdueRate(overdue.rate);
        setGracePeriod(overdue.gracePeriodDays || 3);
        setLoanOverdueId(overdue.id);
      }
    }
  }, [policies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPolicy({
        id: loanStandardId ?? undefined,
        type: "LOAN_STANDARD",
        rate: loanRate,
        frequency: "MONTHLY",
        gracePeriodDays: 0,
      }).unwrap();

      await createPolicy({
        id: loanOverdueId ?? undefined,
        type: "LOAN_OVERDUE",
        rate: overdueRate,
        frequency: "DAILY",
        gracePeriodDays: gracePeriod,
      }).unwrap();

      alert("Policies saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save policies");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#003B42] p-6 rounded-xl shadow-md text-white space-y-6">
      <h2 className="text-xl font-bold mb-4 text-center">Set Loan Policies</h2>

      {/* LOAN_STANDARD */}
      <section className="bg-gray-800 p-4 rounded space-y-3">
        <h3 className="text-lg font-semibold">Loan Standard</h3>
        <p className="text-gray-300 text-sm">Monthly loan interest rate</p>
        <input
          type="number"
          step="0.01"
          value={loanRate}
          onChange={(e) => setLoanRate(Number(e.target.value))}
          placeholder="e.g., 0.05 for 5%"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
        <p className="text-gray-400 text-sm">Frequency is fixed: MONTHLY</p>
      </section>

      {/* LOAN_OVERDUE */}
      <section className="bg-gray-800 p-4 rounded space-y-3">
        <h3 className="text-lg font-semibold">Loan Overdue</h3>
        <p className="text-gray-300 text-sm">Daily overdue rate</p>
        <input
          type="number"
          step="0.01"
          value={overdueRate}
          onChange={(e) => setOverdueRate(Number(e.target.value))}
          placeholder="e.g., 0.02 for 2%"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />

        <p className="text-gray-300 text-sm">Grace period (days before penalty applies)</p>
        <input
          type="number"
          value={gracePeriod}
          onChange={(e) => setGracePeriod(Number(e.target.value))}
          placeholder="e.g., 3"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
        <p className="text-gray-400 text-sm">Frequency is fixed: DAILY</p>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#F9A825] px-4 py-2 rounded font-bold w-full hover:opacity-90 transition"
      >
        {isLoading ? "Saving..." : "Save Policies"}
      </button>

      {error && <p className="text-red-500 mt-2">{(error as any)?.data?.message || "Error setting policies"}</p>}

      {/* Current policies */}
      {policies && (
        <div className="mt-4">
          <h4 className="font-semibold">Current Policies:</h4>
          <ul className="list-disc list-inside">
            {policies.map((p: any) => (
              <li key={p.type}>
                {p.type}: {p.rate * 100}% ({p.frequency}), Grace: {p.gracePeriodDays} days
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default PolicyForm;

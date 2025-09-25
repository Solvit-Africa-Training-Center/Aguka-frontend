import PolicyForm from "@components/dashboard/TreasurerComponents/PolicyForm";

const TreasurerDashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-10">
      {/* Policy Form Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-white">Set Loan Policies</h2>
        <PolicyForm />
      </section>
    </div>
  );
};

export default TreasurerDashboard;

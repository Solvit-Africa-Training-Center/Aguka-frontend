const groupData = [
  { name: "Jean Baptiste Uwimana", contribution: "50,000", loan: "Paid", status: "90%" },
  { name: "Alice Mukamana", contribution: "30,000", loan: "Outstanding", status: "60%" },
  { name: "Samuel Nkurunziza", contribution: "70,000", loan: "Overdue", status: "100%" },
    { name: "Beatrice Nyirahabimana", contribution: "20,000", loan: "None", status: "40%" },
];

const GroupPerformance = () => {
  return (
    <div className="bg-[#003B42] text-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto mt-6 overflow-x-auto">
      <h3 className="font-bold text-3xl mb-4 text-center">Group Performance</h3>

      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-teal-700">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Contribution</th>
            <th className="py-2 px-4 text-left">Loan Status</th>
            <th className="py-2 px-4 text-left">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {groupData.map((item, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-[#004F57]/50" : "bg-[#003B42]"}
            >
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">Rwf {item.contribution}</td>
              <td className="py-2 px-4">{item.loan}</td>
              <td className="py-2 px-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupPerformance;

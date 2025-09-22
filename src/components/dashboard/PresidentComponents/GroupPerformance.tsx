const groupData = [
  { name: "Jean Baptiste Uwimana", contribution: "50,000", loan: "Paid", status: "90%" },
  { name: "Alice Mukamana", contribution: "30,000", loan: "Outstanding", status: "60%" },
  { name: "Samuel Nkurunziza", contribution: "70,000", loan: "Overdue", status: "100%" },
  { name: "Beatrice Nyirahabimana", contribution: "20,000", loan: "None", status: "40%" },
  { name: "David Rwigema", contribution: "45,000", loan: "Paid", status: "80%" },
  { name: "Linda Johnson", contribution: "25,000", loan: "Outstanding", status: "50%" },
  { name: "Michael Smith", contribution: "60,000", loan: "Paid", status: "95%" },
  { name: "Sophia Brown", contribution: "35,000", loan: "None", status: "70%" },
  { name: "James Wilson", contribution: "40,000", loan: "Overdue", status: "55%" },
  { name: "Olivia Davis", contribution: "55,000", loan: "Paid", status: "85%" },
  { name: "Ethan Martinez", contribution: "28,000", loan: "Outstanding", status: "65%" },
  { name: "Isabella Garcia", contribution: "48,000", loan: "None", status: "75%" },
  { name: "Liam Rodriguez", contribution: "52,000", loan: "Paid", status: "90%" },
  { name: "Mia Hernandez", contribution: "33,000", loan: "Outstanding", status: "60%" },
  { name: "Noah Lopez", contribution: "72,000", loan: "Overdue", status: "100%" },
  { name: "Ava Gonzalez", contribution: "22,000", loan: "None", status: "40%" },
  { name: "William Wilson", contribution: "47,000", loan: "Paid", status: "80%" },
];

const GroupPerformance = () => {
  return (
    <div className="bg-[#003B42] text-white rounded-2xl p-4 sm:p-6 md:p-6 shadow-lg max-w-6xl mx-auto mt-6 border-b-4 border-r-4 border-[#F9A825]">
      <h3 className="font-bold text-2xl mb-2 sm:mb-4 text-[#F9A825] text-center">Group Performance</h3>
      <h5 className="text-lg sm:text-xl mb-4 sm:mb-6 text-center">Member contribution and Loan performance</h5>

      <div className="overflow-x-auto overflow-y-auto max-h-[450px]">
        <table className="min-w-[600px] md:min-w-full table-auto border-collapse border border-white">
          <thead>
            <tr>
              {["Name", "Contribution", "Loan Status", "Attendance"].map((header) => (
                <th
                  key={header}
                  className="py-2 px-3 sm:px-4 border border-white text-left sticky top-0 bg-[#004F57] z-10 text-sm sm:text-base"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupData.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#005A66] transition-colors">
                <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">{item.name}</td>
                <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">Rwf {item.contribution}</td>
                <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">{item.loan}</td>
                <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupPerformance;

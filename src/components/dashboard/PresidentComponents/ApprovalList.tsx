// import React from "react";
// import ApprovalCard from "./ApprovalCard";

// const ApprovalList: React.FC = () => {
//   return (
//     <div className="bg-[#002D33] rounded-lg shadow-lg overflow-hidden">
//       <h3 className="text-2xl font-bold text-white p-4 border-b border-gray-600">
//         Approval & Decisions
//       </h3>

//       <ApprovalCard
//         name="Samuel Nkurunziza"
//         type="Business expansion loan for retail shop"
//         amount="75,000"
//         time="15 Jan 13:00"
//         // requestCategory optional — will be inferred as "Loan request"
//       />

//       <ApprovalCard
//         name="Alice Mukamana"
//         type="Application to join saving circle"
//         time="15 Jan 12:45"
//         // will be inferred as "Member request"
//       />

//       <ApprovalCard
//         name="Devid Rwigema"
//         type="Emergency medical expenses loan"
//         amount="50,000"
//         time="15 Jan 12:30"
//       />

//       <ApprovalCard
//         name="Beatrice Nyirahabimana"
//         type="Application to join saving circle"
//         time="15 Jan 11:15"
//       />
//     </div>
//   );
// };

// export default ApprovalList;

import React from "react";
import ApprovalCard from "./ApprovalCard";

const ApprovalPage: React.FC = () => {
  const approvals = [
    { name: "Samuel Nkurunziza", type: "Business expansion loan", amount: "50,000", time: "15 Jun 13:00" },
    { name: "Alice Mukamana", type: "Application to join saving circle", time: "15 Jun 12:45" },
    { name: "Devid Rwigema", type:"Emergency medical expenses loan", amount:"50,000", time:"15 Jan 12:30"},
    { name: "Beatrice Nyirahabimana", type:"Application to join saving circle", time:"15 Jan 11:15"},
    { name: "Michael Smith", type: "Personal loan request", amount: "20,000", time: "14 Jun 14:10" },
    { name: "Linda Johnson", type: "Member removal request", time: "13 Jun 09:30" },
  ];

  return (
    <div className="min-h-screen bg-[#002F35] flex justify-center p-15 rounded-lg shadow-lg overflow-hidden font-poppins">
    
      <div className="w-full max-w-6xl space-y-4">
          <h3 className="text-2xl font-bold text-white p-4 border-b border-gray-600">
      Approval & Decisions
       </h3>
        {approvals.map((item, idx) => (
          <ApprovalCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ApprovalPage;

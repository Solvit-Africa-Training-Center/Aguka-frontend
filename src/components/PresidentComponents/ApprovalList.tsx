import React from "react";
import ApprovalCard from "@components/PresidentComponents/ApprovalCard";

const ApprovalList: React.FC = () => {
  return (
    <div className="bg-[#003B42] p-4">
      <h3 className="text-2xl text-[] font-bold mb-4">Approval & Decisions</h3>

      <ApprovalCard
        name="Samuel Nkurunziza"
        type="Business expansion loan"
        amount="50,000"
        time="15 Jun 13:00"
      />

      <ApprovalCard
        name="Alice Mukamana"
        type="Application to join saving circle"
        time="15 Jun 12:45"
      />

      <ApprovalCard
        name="Devid Rwigema"
        type="Emergency medical expenses loan"
        amount="50,000"
        time="15 Jun 12:30"
      />

      <ApprovalCard
        name="Beatrice Nyirahabimana"
        type="Application to join saving circle"
        time="15 Jun 11:15"
      />
    </div>
  );
};

export default ApprovalList;

import { useState } from "react";
import ActionPromptCard from "@components/dashboard/TreasurerComponents/ActionPromptCard";

const AllowContributionPage = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const users = [
    { value: "user1", label: "John Doe" },
    { value: "user2", label: "Jane Smith" },
    { value: "user3", label: "Patrick K." },
  ];

  const handleContinue = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    alert(`Selected user: ${selectedUser}`);
  };

  return (
    <div className="min-h-screen bg-[#003B42] space-y-10 flex items-center justify-center p-4">
      <ActionPromptCard
        title="Allow Everyone to"
        highlightedText="Contribute"
        selectOptions={users}
        selectedValue={selectedUser}
        onChange={setSelectedUser}
        onContinue={handleContinue}
        placeholder="Choose the one who is contributing"
      />
    </div>
  );
};

export default AllowContributionPage;

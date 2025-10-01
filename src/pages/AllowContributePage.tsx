import { useState, useMemo } from "react";
import ActionPromptCard from "@components/dashboard/TreasurerComponents/ActionPromptCard";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "@services/api/authApi";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";

const AllowContributionPage = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  const { data: usersData, isLoading: loadingUsers } = useGetUsersQuery();

  const users: { value: string; label: string }[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData)
      ? usersData
      : Array.isArray((usersData as any)?.data)
      ? (usersData as any).data
      : [];

    return arr
      .filter((u: User) => u.groupId === currentGroupId)
      .map((u: User) => ({
        value: u.id,
        label: u.name,
      }));
  }, [usersData, currentGroupId]);

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

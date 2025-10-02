import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ActionPromptCard from "@components/dashboard/TreasurerComponents/ActionPromptCard";
import { useCreateContributionMutation } from "@services/api/ContributionApi";
import { useGetUsersQuery } from "@services/api/authApi";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";
import type { ContributionCreate, PaymentMethod } from "types/Contribution";

const AllowContributionPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId || "";


  const { data: usersData } = useGetUsersQuery();
  const [createContribution] = useCreateContributionMutation();

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

  const handleContinue = async (userId: string, amountValue: number) => {
    if (!userId) {
      toast.error("Please select a user");
      return;
    }
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const contributionPayload: ContributionCreate = {
        userId,
        groupId: currentGroupId,
        amount: amountValue,
        paymentMethod: "Cash",
        contributionDate: new Date().toISOString(),
      };

      await createContribution(contributionPayload).unwrap();

      toast.success("Contribution recorded successfully!");
      setSelectedUser("");
      setAmount("");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Failed to create contribution. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#003B42] flex flex-col items-center justify-center p-4 space-y-10">
      <ActionPromptCard
        title="Allow a Member to"
        highlightedText="Contribute"
        selectOptions={users}
        selectedValue={selectedUser}
        onChange={setSelectedUser}
        onContinue={handleContinue}
        amount={amount}
        setAmount={setAmount}
        placeholder="Choose the member contributing"
      />
    </div>
  );
};

export default AllowContributionPage;

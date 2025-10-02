import React, { useState } from "react";
import CommunicationCard from "./CommunicationCard";
import type { CommunicationCardProps } from "./CommunicationCard";

import { MessageSquare } from "lucide-react";
import SendMessageForm from "./SendMessageForm";

const CommunicationHistory: React.FC = () => {
  const [communications, setCommunications] = useState<
    CommunicationCardProps[]
  >([]);

  const handleNewCommunication = (
    title: string,
    recipients: string | number,
    channel: "SMS" | "Email"
  ) => {
    const newCommunication: CommunicationCardProps = {
      title: title.length > 50 ? title.slice(0, 50) + "..." : title,
      date: new Date().toLocaleDateString(),
      recipients,
      status: "Delivered",
      channel,
    };
    setCommunications((prev) => [newCommunication, ...prev]);
  };

  return (
    <section className="border border-neutral-200 p-6 rounded-xl text-white font-poppins space-y-7">
      <div className="flex gap-2 text-secondary-500">
        <MessageSquare className="size-10" />
        <h2 className="text-3xl font-semibold mb-4">Communication History</h2>
      </div>

      {communications.map((comm, idx) => (
        <CommunicationCard key={idx} {...comm} />
      ))}

      <SendMessageForm onSend={handleNewCommunication} />
    </section>
  );
};

export default CommunicationHistory;

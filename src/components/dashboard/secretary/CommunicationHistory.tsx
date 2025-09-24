import CommunicationCard from "./CommunicationCard";

import { MessageSquare } from "lucide-react";
import SendMessageForm from "./SendMessageForm";
const CommunicationHistory: React.FC = () => (
  <section className="border border-neutral-200 p-6 rounded-xl text-white font-poppins space-y-7">
    <div className="flex gap-2 text-secondary-500 ">
      <span>
        {" "}
        <MessageSquare className="size-10" />
      </span>
      <h2 className="text-3xl font-semibold mb-4 ">Communication History</h2>
    </div>
    <CommunicationCard
      title="Payment Reminder"
      date="2024-09-03"
      recipients="4 recipients"
      status="Delivered"
    />
    <CommunicationCard
      title="Monthly Newsletter"
      date="2024-09-02"
      recipients="4 recipients"
      status="Delivered"
    />
    <CommunicationCard
      title="Meeting Notification"
      date="2024-08-30"
      recipients="4 recipients"
      status="Delivered"
    />
    <CommunicationCard
      title="Agenda: NextMonth’s Meeting"
      date="2024-08-28"
      recipients="4 recipients"
      status="Delivered"
    />
    <SendMessageForm />
  </section>
);

export default CommunicationHistory;

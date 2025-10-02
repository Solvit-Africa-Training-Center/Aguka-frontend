import React from "react";
import { MessageSquare } from "lucide-react";

// Define the props interface
export interface CommunicationCardProps {
  title: string;
  date: string;
  recipients: string | number;
  status: "Delivered" | "Pending";
  channel?: "SMS" | "Email"; // Optional for future use
}

const CommunicationCard: React.FC<CommunicationCardProps> = ({
  title,
  date,
  recipients,
  status,
  channel = "SMS",
}) => {
  const statusColor =
    status === "Delivered" ? "bg-[#00B7C2]" : "bg-yellow-500 text-black";

  return (
    <div className="flex items-center justify-between font-poppins text-white border border-white/30 rounded-lg px-4 py-3 w-full  mx-auto">
      {/* Left section: Icon and info */}
      <div className="flex items-center space-x-4">
        <div>
          <MessageSquare className="bg-[#009AAA] p-2 size-10 text-[#005159] rounded-full" />
        </div>

        <div>
          <h3 className="font-semibold text-base">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
            <span className="px-2 py-[1px] text-xs rounded border border-secondary-400 text-white">
              {channel}
            </span>
            <span>{date}</span>
            <span>•</span>
            <span>{recipients} recipients</span>
          </div>
        </div>
      </div>

      {/* Right section: Status */}
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}>
        {status}
      </span>
    </div>
  );
};

export default CommunicationCard;

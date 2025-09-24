import React from "react";
import { Users, Calendar, Bell, FileText } from "lucide-react";
import CommunityFeed from "@components/dashboard/member/CommunityFeed";

// ✅ Shared Status Type
type Status = "Completed" | "Postponed" | "Scheduled";

// ✅ Meeting Type
interface Meeting {
  title: string;
  date: string;
  attendees: number;
  status: Status;
}

// ✅ Communication Type
interface Communication {
  title: string;
  type: "SMS" | "Email";
  date: string;
  recipients: number;
  status: Status;
}

// ✅ Status Styling Function (works for both Meetings & Communications)
const getStatusClasses = (status: Status): string => {
  switch (status) {
    case "Completed":
      return "bg-[#003D42] text-white";
    case "Postponed":
      return "bg-[#D1F2D3] text-[#003D42]";
    case "Scheduled":
      return "bg-[#F9CF24] text-[#003B42]";
    default:
      return "bg-gray-400 text-white";
  }
};

// ✅ Sample Meetings
const meetings: Meeting[] = [
  {
    title: "Monthly General Meeting",
    date: "2024-01-20",
    attendees: 42,
    status: "Completed",
  },
  {
    title: "Loan Committee Meeting",
    date: "2024-01-27",
    attendees: 8,
    status: "Completed",
  },
  {
    title: "Board Meeting",
    date: "2024-02-03",
    attendees: 12,
    status: "Scheduled",
  },
];

// ✅ Sample Communications
const communications: Communication[] = [
  {
    title: "Payment Reminder",
    type: "SMS",
    date: "2024-01-15",
    recipients: 45,
    status: "Completed",
  },
  {
    title: "Monthly Newsletter",
    type: "Email",
    date: "2024-01-10",
    recipients: 42,
    status: "Postponed",
  },
  {
    title: "Meeting Notification",
    type: "SMS",
    date: "2024-06-05",
    recipients: 46,
    status: "Scheduled",
  },
];

const SecretaryDashboard: React.FC = () => {
  return (
    <div className="p-10 bg-[#043c44] min-h-screen text-white font-poppins">
      {/* Header */}
      <h1 className="text-4xl font-bold mt-45 capitalize">
        Secretary Dashboard
      </h1>
      <p className="text-gray-300">
        Manage records, meetings and communications
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-6">
        <div className="bg-[#D9E9EB] rounded-xl p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#003D42]">Total Members</span>
            <Users size={20} className="text-[#F9A825]" />
          </div>
          <p className="text-3xl font-bold mt-2 text-[#003D42]">45</p>
          <p className="text-sm text-[#555555]">3 new this month</p>
        </div>

        <div className="bg-[#D9E9EB] rounded-xl p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#003D42]">Meetings This Month</span>
            <Calendar size={20} className="text-[#F9A825]" />
          </div>
          <p className="text-3xl font-bold mt-2 text-[#003D42]">4</p>
          <p className="text-sm text-[#555555]">2 completed, 2 scheduled</p>
        </div>

        <div className="bg-[#D9E9EB] rounded-xl p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#003D42]">Communications Sent</span>
            <Bell size={20} className="text-[#F9A825]" />
          </div>
          <p className="text-3xl font-bold mt-2 text-[#003D42]">12</p>
          <p className="text-sm text-[#555555]">100% delivery rate</p>
        </div>

        <div className="bg-[#D9E9EB] rounded-xl p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#003D42]">Meeting Minutes</span>
            <FileText size={20} className="text-[#F9A825]" />
          </div>
          <p className="text-3xl font-bold mt-2 text-[#003D42]">8</p>
          <p className="text-sm text-[#555555]">All up to date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-6 mb-20">
        {/* Recent Communications */}
        <div className="bg-[#D9E9EB] px-10 py-4 rounded-xl border border-[#F9A825] h-120">
          <h2 className="text-2xl font-extrabold text-[#003B42]">
            Communications
          </h2>
          <p className="text-[#628184] text-sm mb-15">
            Recent communications sent
          </p>
          <ul className="space-y-10">
            {communications.map((comm, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium text-[#003D42] text-xl">
                    {comm.title}
                  </p>
                  <p className="text-sm text-[#628184]">
                    {comm.date} • {comm.recipients} recipients • {comm.type}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-2 rounded-full font-semibold shadow-md ${getStatusClasses(
                    comm.status
                  )}`}>
                  {comm.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Feed */}
        <div className="font-poppins text-[#b2b2b2] mt-2 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl p-4">
          <h2 className="text-left ml-10 text-3xl capitalize p-2 text-[#F9A825] font-bold">
            community feeds
          </h2>
          <div>
            <CommunityFeed />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="place-items-center">
        <hr className="w-300 text-[#D4D4D4] p-5" />
        <div className="text-sm text-center pt-15 capitalize text-[#D4D4D4] p-4">
          <span>
            &copy; 2025 Aguka. All rights reserved. Building Wealth through
            community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;

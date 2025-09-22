import React from "react";
import { Users, Calendar, Bell, FileText } from "lucide-react";

interface Meeting {
  title: string;
  date: string;
  attendees: number;
  status: "completed" | "scheduled";
}

interface Communication {
  title: string;
  type: "SMS" | "Email";
  date: string;
  recipients: number;
  status: "Delivered" | "Pending";
}

const meetings: Meeting[] = [
  {
    title: "Monthly General Meeting",
    date: "2024-01-20",
    attendees: 42,
    status: "completed",
  },
  {
    title: "Loan Committee Meeting",
    date: "2024-01-27",
    attendees: 8,
    status: "completed",
  },
  {
    title: "Board Meeting",
    date: "2024-02-03",
    attendees: 12,
    status: "scheduled",
  },
];

const communications: Communication[] = [
  {
    title: "Payment Reminder",
    type: "SMS",
    date: "2024-01-15",
    recipients: 45,
    status: "Delivered",
  },
  {
    title: "Monthly Newsletter",
    type: "Email",
    date: "2024-01-10",
    recipients: 42,
    status: "Delivered",
  },
  {
    title: "Meeting Notification",
    type: "SMS",
    date: "2024-06-05",
    recipients: 46,
    status: "Delivered",
  },
];

const SecretaryDashboard: React.FC = () => {
  return (
    <div className="p-10 bg-[#043c44] min-h-screen text-white font-poppins">
      {/* Header */}
      <h1 className="text-4xl font-bold mt-45 capitalize">Secretary Dashboard</h1>
      <p className="text-gray-300">
        Manage records, meetings and Communications
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

      {/* Tabs */}
      <div className="flex mt-16 border border-gray-700 justify-between items-center bg-[#F4F4F4] rounded-md  text-[#003B42]">
        {[
          "Overview",
          "Meetings",
          "Communications",
          "Member Records",
          "Calendar",
        ].map((tab, index) => (
          <button
            key={index}
          className={`ml-10 mr-10 hover:bg-amber-100 hover:rounded-md px-10 py-4 `}
             >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-6 mb-20">
        {/* Recent Meetings */}
        <div className="bg-[#D9E9EB] px-10 py-4 rounded-xl border border-[#F9A825]">
          <h2 className="text-2xl font-extrabold text-[#003B42]">Recent Meetings</h2>
          <p className="text-[#628184] text-sm mb-15">
            Latest meeting activities
          </p>
          <ul className="space-y-10">
            {meetings.map((meeting, index) => (
              <li key={index} className="flex justify-between items-center ">
                <div className="spce-y-4">
                  <p className="font-medium text-[#003D42] text-xl">{meeting.title}</p>
                  <p className="text-sm text-[#628184] ">
                    {meeting.date} • {meeting.attendees} attendees
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-3 rounded-full ${
                    meeting.status === "completed"
                      ? "bg-[#003D42]"
                      : "bg-[#F9CF24] text-[#003B42]"
                  }`}>
                  {meeting.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Communications */}
        <div className="bg-[#D9E9EB] px-10 py-4 rounded-xl border border-[#F9A825] ">
          <h2 className="text-2xl font-extrabold text-[#003B42] ">Recent Communications</h2>
          <p className="text-[#628184] text-sm mb-10">Latest messages sent</p>
          <ul className="space-y-4">
            {communications.map((comm, index) => (
              <li key={index} className="flex justify-between items-center border border-[#D4D4D4] p-4 rounded-lg ">
                <div className="space-y-4">
                  <p className="font-medium text-[#003D42] text-xl">{comm.title}</p>
                  <p className="text-sm text-[#628184]">
                    <span className="text-[#003D42] font-bold border border-[#F9A825] p-2 rounded-2xl text-1xl">{comm.type}</span> • {comm.date} • {comm.recipients} recipients
                  </p>
                </div>
                <span className="bg-gray-700 text-xs px-3 py-1 rounded-full">
                  {comm.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;

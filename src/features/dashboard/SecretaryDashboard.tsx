import React, { useMemo } from "react";
import { Users, Calendar, Bell, FileText } from "lucide-react";
import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetAnnouncementsQuery } from "@services/api/announcementApi";
import { isSameMonth, parseISO, isBefore } from "date-fns";
import type { User } from "@models/User";
import ScheduleMeetingForm from "@components/dashboard/secretary/ScheduleMeetingForm";

type Status = "Completed" | "Postponed" | "Scheduled";
interface Communication {
  title: string;
  type: "SMS" | "Email" | "Meeting";
  date: string;
  recipients: number;
  status: Status;
}

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

const SecretaryDashboard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  const { data: usersData } = useGetUsersQuery();
  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData)
      ? usersData
      : Array.isArray((usersData as any)?.data)
      ? (usersData as any).data
      : [];
    return arr.filter((u: User) => u.groupId === currentGroupId);
  }, [usersData, currentGroupId]);

  const totalUsersInGroup = users.length;
  const now = new Date();
  const newUsersThisMonth = users.filter(
    (user) => user.createdAt && isSameMonth(parseISO(user.createdAt), now)
  ).length;

  // 🔥 Announcements as meetings / communications
  const { data: announcementsData } = useGetAnnouncementsQuery({
    page: 1,
    limit: 100,
  });
  const announcements = announcementsData || [];

  const communications: Communication[] = useMemo(() => {
    return announcements.map((a: any) => {
      const meetingDate = a.meetingDate ? parseISO(a.meetingDate) : now;
      let status: Status = "Scheduled";

      if (a.meetingDate && isBefore(meetingDate, now)) status = "Completed";

      return {
        title: a.title || "No title",
        type: a.type || "Meeting",
        date: a.meetingDate || "",
        recipients: a.recipients || 0,
        status,
      };
    });
  }, [announcements, now]);

  const meetingsThisMonth = announcements.filter(
    (a: any) => a.meetingDate && isSameMonth(parseISO(a.meetingDate), now)
  ).length;

  const communicationsSent = communications.length;

  const getStatusCount = (status: Status) =>
    communications.filter((c) => c.status === status).length;

  return (
    <div className="w-full min-h-screen bg-[#043c44] text-white font-poppins">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
              Secretary Dashboard
            </h1>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Manage records, meetings, and communications
            </p>
          </div>

          <div className="shrink-0">
            <ScheduleMeetingForm />
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {[
            {
              label: "Total Members",
              value: totalUsersInGroup,
              subtitle: `${newUsersThisMonth} new this month`,
              icon: <Users size={20} className="text-[#F9A825]" />,
            },
            {
              label: "Meetings This Month",
              value: meetingsThisMonth,
              subtitle: `${getStatusCount(
                "Completed"
              )} completed, ${getStatusCount("Scheduled")} scheduled`,
              icon: <Calendar size={20} className="text-[#F9A825]" />,
            },
            {
              label: "Communications Sent",
              value: communicationsSent,
              subtitle: "Total communications sent",
              icon: <Bell size={20} className="text-[#F9A825]" />,
            },
            {
              label: "Meeting Minutes",
              value: announcements.length,
              subtitle: "All up to date",
              icon: <FileText size={20} className="text-[#F9A825]" />,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#D9E9EB] rounded-xl p-4 flex flex-col justify-between space-y-3 min-h-[10rem]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#003D42]">{card.label}</span>
                {card.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold mt-2 text-[#003D42]">
                {card.value}
              </p>
              <p className="text-sm text-[#555555]">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Recent Communications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-12">
          <div className="bg-[#D9E9EB] rounded-xl border border-[#F9A825] p-4 sm:p-6 overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003B42]">
              Meeting schedule
            </h2>
            <p className="text-[#628184] text-sm mb-4">
              Latest meeting activities
            </p>
            <ul className="space-y-4 max-h-96 overflow-auto pr-2">
              {communications.map((comm, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start gap-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-[#003D42] text-base sm:text-lg">
                      {comm.title}
                    </p>
                    <p className="text-sm text-[#628184]">
                      {comm.date} • {comm.recipients} recipients • {comm.type}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-2 rounded-full font-semibold shadow-md ${getStatusClasses(
                      comm.status
                    )}`}
                  >
                    {comm.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="font-poppins text-[#b2b2b2] mt-0 border border-secondary-300 overflow-auto scrollbar-hide shadow-lg rounded-2xl p-4 max-h-96">
            <h2 className="text-left text-2xl sm:text-3xl capitalize p-2 text-[#F9A825] font-bold">
              community feeds
            </h2>
            <CommunityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;

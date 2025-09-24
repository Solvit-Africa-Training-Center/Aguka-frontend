import { Bell } from "lucide-react";

import type { FC } from "react";
import AnnouncementCard from "./AnnouncementCard"; // adjust path as needed

const GroupAnnouncements: FC = () => {
  return (
    <section className=" p-6 rounded-xl text-white mt-6 border border-white">
      <div className="flex gap-2 mb-10 text-secondary-500">
        <Bell className="mt-0.5 size-10" />
        <h2 className="text-3xl  font-semibold mb-4">Group Announcements</h2>
      </div>
      <AnnouncementCard
        title="Annual General Meeting Reminder"
        snippet="Please be reminded of the Annual General Meeting..."
        date="2024-12-10"
        status={["high", "draft"]}
      />

      <AnnouncementCard
        title="New Loan Application Process"
        snippet="The new loan application process has been updated..."
        date="2024-11-25"
        status={["medium", "sent"]}
      />

      <AnnouncementCard
        title="Next Month’s Meeting Agenda"
        snippet="Agenda for next month's meeting has been finalized..."
        date="2024-12-01"
        status={["medium", "draft"]}
      />

      <AnnouncementCard
        title="Draft Message"
        snippet="This is a draft message waiting to be sent..."
        date="2024-11-15"
        status={["draft"]}
      />

      <AnnouncementCard
        title="Completed Announcement"
        snippet="This announcement has already been sent..."
        date="2024-10-30"
        status={["sent"]}
      />
    </section>
  );
};

export default GroupAnnouncements;

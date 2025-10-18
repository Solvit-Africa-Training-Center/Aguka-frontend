import type { FC } from "react";
import { Bell } from "lucide-react";
import AnnouncementCard from "./AnnouncementCard"; 
import { useGetAnnouncementsQuery } from "@services/api/announcementApi";
import type { Announcement } from "types/Announcement";

const GroupAnnouncements: FC = () => {
  const {
    data: announcements,
    isLoading,
    isError,
  } = useGetAnnouncementsQuery({ page: 1, limit: 10 });

  if (isLoading)
    return <p className="text-white p-4">Loading announcements...</p>;
  if (isError)
    return <p className="text-white p-4">Failed to load announcements.</p>;

  return (
    <section className="p-6 rounded-xl text-white mt-6 border border-white">
      <div className="flex gap-2 mb-10 text-secondary-500">
        <Bell className="mt-0.5 size-10" />
        <h2 className="text-3xl font-semibold mb-4">Group Announcements</h2>
      </div>

      {announcements && announcements.length > 0 ? (
        announcements.map((a: Announcement) => (
          <AnnouncementCard
            key={a.id}
            title={a.title}
            snippet={(a as any).snippet || "No content"} 
            date={(a as any).date || new Date().toISOString().split("T")[0]} 
            status={(a as any).status ? [(a as any).status] : ["draft"]} 
          />
        ))
      ) : (
        <p className="text-white">No announcements available.</p>
      )}
    </section>
  );
};

export default GroupAnnouncements;

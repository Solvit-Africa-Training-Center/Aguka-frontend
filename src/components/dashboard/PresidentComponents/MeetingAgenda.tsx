import React from "react";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import { useGetAnnouncementsQuery } from "@services/api/announcementApi";
import type { Announcement } from "types/Announcement";
import ScheduleMeetingForm from "../secretary/ScheduleMeetingForm";

interface MeetingAgendaProps {
  groupId?: string;
}

const MeetingAgenda: React.FC<MeetingAgendaProps> = ({ groupId }) => {
  const { data, isLoading, isError } = useGetAnnouncementsQuery({
    page: 1,
    limit: 100,
  });
  const announcements: Announcement[] = Array.isArray(data) ? data : [];
  const filteredAnnouncements = groupId
    ? announcements.filter((a) => a.groupId === groupId)
    : announcements;

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading meetings...</p>;

  if (isError)
    return (
      <p className="text-white text-center mt-10">Failed to load meetings.</p>
    );

  return (
    <div className="p-6 bg-[#003B42] text-white rounded-2xl shadow-lg max-w-6xl mx-auto mt-6 border-b-4 border-l-4 border-[#F9A825] font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center gap-16 mb-6">
        <div>
          <h3 className="text-2xl font-bold mt-4 text-[#F9A825]">
            Meeting & Agenda
          </h3>
          <p className="text-white mt-2">Upcoming meetings & schedules</p>
        </div>

        <ScheduleMeetingForm className="border border-[#F9A825] mt-2 !bg-transparent !from-transparent !to-transparent  !text-[#F9A825] px-4 py-1 !rounded-full text-sm hover:!bg-[#F9A825] hover:!text-[#00353B] transition !size-fit" />
      </div>

      {/* Meetings List */}
      {filteredAnnouncements.length > 0 ? (
        <div className="overflow-y-auto max-h-[500px] space-y-6">
          {filteredAnnouncements.map((m: Announcement, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-3 bg-[#004045] rounded-xl p-4 shadow">
              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-md">
                  <Calendar className="w-6 h-6 text-[#F9A825]" />
                </div>
                <p className="font-semibold text-lg">{m.title}</p>
              </div>

              {/* Date, Time, Location */}
              <div className="flex flex-wrap gap-6 ml-11 text-sm text-gray-300">
                {m.meetingDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F9A825]" />
                    <span>{m.meetingDate}</span>
                  </div>
                )}
                {m.meetingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F9A825]" />
                    <span>{m.meetingTime}</span>
                  </div>
                )}
                {m.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F9A825]" />
                    <span>{m.location}</span>
                  </div>
                )}
              </div>

              {/* Agenda */}
              {m.agenda && (
                <div className="ml-11">
                  <div className="flex items-center gap-2 font-medium">
                    <FileText className="w-4 h-4 text-[#F9A825]" />
                    <span>Agenda</span>
                  </div>
                  <p className="text-sm text-gray-400">{m.agenda}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-10">No meetings scheduled.</p>
      )}
    </div>
  );
};

export default MeetingAgenda;

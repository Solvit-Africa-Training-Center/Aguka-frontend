import { Calendar, Clock, MapPin, FileText } from "lucide-react";

const meetings = [
  {
    title: "Monthly General Assembly",
    date: "Monday 20 January",
    time: "14:00",
    location: "Community center hall",
    agenda: "Financial review, new member applications, Loan approval",
  },
  {
    title: "Executive committee meeting",
    date: "Saturday 25 January 2025",
    time: "16:00",
    location: "Office conference room",
    agenda: "Strategic planning, policy updates",
  },
  {
    title: "Quarterly Review",
    date: "Saturday 1 February 2025",
    time: "10:00",
    location: "Main Hall",
    agenda: "Performance analysis, goal setting for Q2",
  },
];

const MeetingAgenda = () => {
  return (
    <div className="p-6 bg-[#00353B] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#F9A825]">
            Meeting & Agenda
          </h3>
          <p className="text-gray-300">
            Upcoming meetings & Schedules
          </p>
        </div>
        <button className="border border-[#F9A825] text-[#F9A825] px-4 py-1 rounded-full text-sm hover:bg-[#F9A825] hover:text-[#00353B] transition">
          +Schedule meeting
        </button>
      </div>

      {/* Meeting list */}
      <ul className="space-y-6">
        {meetings.map((m, idx) => (
          <li
            key={idx}
            className="flex flex-col gap-3 bg-[#004045] rounded-xl p-4 shadow"
          >
            {/* Title with icon */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-md">
                <Calendar className="w-6 h-6 text-[#F9A825]" />
              </div>
              <p className="font-semibold text-lg">{m.title}</p>
            </div>

            {/* Date, time, location */}
            <div className="flex flex-wrap gap-6 ml-11 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F9A825]" />
                <span>{m.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F9A825]" />
                <span>{m.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F9A825]" />
                <span>{m.location}</span>
              </div>
            </div>

            {/* Agenda */}
            <div className="ml-11">
              <div className="flex items-center gap-2 font-medium">
                <FileText className="w-4 h-4 text-[#F9A825]" />
                <span>Agenda</span>
              </div>
              <p className="text-sm text-gray-400">{m.agenda}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingAgenda;

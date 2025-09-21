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
  {
    title: "Special Loan Committee Meeting",
    date: "Wednesday 5 February 2025",
    time: "15:00",
    location: "Office conference room",
    agenda: "Review urgent loan applications",
  },
  {
    title: "Annual General Meeting",
    date: "Saturday 15 March 2025",
    time: "09:00",
    location: "Community center hall",
    agenda: "Year-end financials, elections, major decisions",
  },
  {
    title: "Training Workshop",
    date: "Thursday 20 March 2025",
    time: "13:00",
    location: "Training room",
    agenda: "Member education on savings and loans",
  },
  
  // more meetings fetched from backend...
];

const MeetingAgenda = () => {
  return (
    <div className="p-6 bg-[#003B42] text-white rounded-2xl shadow-lg max-w-6xl mx-auto mt-6 border-b-4 border-l-4 border-[#F9A825]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold mt-4 text-[#F9A825]">Meeting & Agenda</h3>
          <p className="text-white mt-5">Upcoming meetings & Schedules</p>
        </div>
        <button className="border border-[#F9A825] mt-10 text-[#F9A825] px-4 py-1 rounded-full text-sm hover:bg-[#F9A825] hover:text-[#00353B] transition">
          +Schedule meeting
        </button>
      </div>

      {/* Scrollable Meeting List */}
      <div className="overflow-y-auto max-h-[500px] space-y-6">
        {meetings.map((m, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 bg-[#004045] rounded-xl p-4 shadow">
          
            {/* Title with icon */}
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingAgenda;

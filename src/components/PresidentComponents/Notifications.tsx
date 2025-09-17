import { Bell, AlertTriangle, CalendarClock } from "lucide-react";

const notifications = [
  {
    title: "Contribution deadline",
    description: "Next contribution deadline is September 10 2025",
    time: "15 Jan 10:00",
    type: "Deadline",
    icon: CalendarClock,
  },
  {
    title: "Loan repayment due",
    description: "Loan repayment due September 15 for 3 members",
    time: "15 Jan 9:30",
    type: "Reminder",
    icon: Bell,
  },
  {
    title: "System maintenance",
    description: "Schedule maintenance on January 20 2025 from 2:00 to 4:00 AM",
    time: "14 Jan 16:00",
    type: "Alert",
    icon: AlertTriangle,
  },
];

const typeColors: { [key: string]: string } = {
  Deadline: "border border-yellow-500 text-yellow-500",
  Reminder: "border border-blue-500 text-blue-500",
  Alert: "border border-red-500 text-red-500",
};

const Notifications = () => {
  return (
    <div className="p-6 bg-[#003B42] min-h-screen text-white">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#F9A825]">
          Notifications and Announcements
        </h3>
        <p className="text-gray-300">
          Latest updates and important notices
        </p>
      </div>

      <ul className="space-y-4">
        {notifications.map((n, idx) => {
          const Icon = n.icon;
          return (
            <li
              key={idx}
              className="flex items-center justify-between "
            >
              {/* Left side */}
              <div className="flex items-center gap-4">
                {/* Icon with background */}
                <div className="bg-white/10 rounded-lg p-3">
                  <Icon className="w-6 h-6 text-[#F9A825]" />
                </div>

                {/* Title & Description */}
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-gray-400">{n.description}</p>
                </div>
              </div>

              {/* Right side: time + type badge */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-300">{n.time}</span>
                <span
                  className={`${typeColors[n.type]} px-3 py-1 rounded-full text-xs`}
                >
                  {n.type}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;

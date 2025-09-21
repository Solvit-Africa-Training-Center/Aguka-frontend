
import { Calendar, Bell, AlertTriangle } from "lucide-react";

const notifications = [
  {
    title: "Contribution deadline",
    description: "Next contribution deadline is September 10 2025",
    time: "15 Jan 10:00",
    type: "Deadline",
    icon: <Calendar className="w-6 h-6 text-[#F9A825]" />,
  },
  {
    title: "Loan repayment due",
    description: "Loan repayment due September 15 for 3 members",
    time: "15 Jan 9:30",
    type: "Reminder",
    icon: <Bell className="w-6 h-6 text-[#F9A825]" />,
  },
  {
    title: "System maintenance",
    description: "Schedule maintenance on January 20 2025 from 2:00 to 4:00 AM",
    time: "14 Jan 16:00",
    type: "Alert",
    icon: <AlertTriangle className="w-6 h-6 text-[#F9A825]" />,
  },
  {
    title: "System maintenance",
    description: "Schedule maintenance on January 20 2025 from 2:00 to 4:00 AM",
    time: "14 Jan 16:00",
    type: "Alert",
    icon: <AlertTriangle className="w-6 h-6 text-[#F9A825]" />,
  },
  {
    title: "System maintenance",
    description: "Schedule maintenance on January 20 2025 from 2:00 to 4:00 AM",
    time: "14 Jan 16:00",
    type: "Alert",
    icon: <AlertTriangle className="w-6 h-6 text-[#F9A825]" />,
  },
];

const typeColors: { [key: string]: string } = {
  Deadline: "border border-[#F9A825] text-[#FFFFFF]",
  Reminder: "border border-[#F9A825] text-[#FFFFFF]",
  Alert: "border border-[#F9A825] text-[#FFFFFF]",
};

const Notifications = () => {
  return (
    <div className="p-15 bg-[#002F35] min-h-screen font-poppins">
      <div className="flex justify-center items-center">
      <h3 className="text-2xl font-bold text-[#F9A825] mb-1">
        Notifications and Announcement
      </h3></div>
      <div className="flex justify-center items-center">
      <p className="text-sm text-[#FFFFFF] mb-10">
        Latest updates and important notices
      </p>
      </div>
      <ul className="space-y-4">
        {notifications.map((n, idx) => (
          <li
            key={idx}
            className="p-4 rounded-lg flex justify-between items-center shadow">
          
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white rounded-md">{n.icon}</div>
              <div>
                <p className="text-white font-medium">{n.title}</p>
                <p className="text-white text-sm">{n.description}</p>
              </div>
            </div>
            <div className="text-white text-sm mx-4">{n.time}</div>
              <div className="flex items-center space-x-8">
              <p className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[n.type]}`}>
                {n.type}
              </p>
              </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

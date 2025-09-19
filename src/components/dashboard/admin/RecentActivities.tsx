import React from "react";
import { ListChecks, Megaphone, MessageCircle, DollarSign } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  user?: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
}

const activities: Activity[] = [
  {
    time: "42 mins ago",
    title: "Task Updated",
    user: "Sandra",
    description: "Updated a task",
    icon: <ListChecks className="w-6 h-6 text-white" />,
    color: "bg-yellow-600",
  },
  {
    time: "1 hour ago",
    title: "Published Announcement",
    user: "David",
    description: "Given announcement",
    icon: <Megaphone className="w-6 h-6 text-white" />,
    color: "bg-cyan-600",
  },
  {
    time: "9 hours ago",
    title: "Replayed Comment",
    user: "Merci",
    description: "Added a comment",
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    color: "bg-teal-600",
  },
  {
    time: "1 day ago",
    title: "Loan Asked",
    icon: <DollarSign className="w-6 h-6 text-white" />,
    color: "bg-red-700",
  },
];

const RecentActivities: React.FC = () => {
  return (
    <div className=" p-6 rounded-lg  text-white border border-secondary-400 w-150 h-115 mt-25 capitalize ">
      <h2 className="text-2xl font-bold mb-4 ">Recent Activities</h2>
      <div className="space-y-6 space-x-5 items-center">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-10">
            <p className="text-gray-400 min-w-[90px]">{activity.time}</p>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${activity.color}`}>
              {activity.icon}
            </div>
            <div>
              <h3 className="font-semibold text-xl">{activity.title}</h3>
              {activity.user && (
                <p className="text-1xl text-[#F4F4F4]">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  <span className="text-sm text-[#929292]">
                    {activity.description}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

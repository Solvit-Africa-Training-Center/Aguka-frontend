
const notifications = [
  { title: "Contribution deadline", time: "15 Jun 8:00", type: "info" },
  { title: "Loan repayment due", time: "15 Jun 9:00", type: "warning" },
  { title: "System maintenance", time: "14 Jun 5:00", type: "alert" },
];

const typeColors: { [key: string]: string } = {
  info: "bg-green-500",
  warning: "bg-yellow-400",
  alert: "bg-red-500",
};

const Notifications = () => {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Notifications & Announcements</h3>
      <ul className="space-y-3">
        {notifications.map((n, idx) => (
          <li
            key={idx}
            className="bg-teal-700 rounded p-4 shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-gray-500">{n.time}</p>
            </div>
            <span
              className={`${typeColors[n.type]} text-white px-3 py-1 rounded-full text-sm`}
            >
              {n.type.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

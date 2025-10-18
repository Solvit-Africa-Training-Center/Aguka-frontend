import type { FC } from "react";
import { SquarePen } from "lucide-react";
import { Send } from "lucide-react";
interface AnnouncementCardProps {
  title: string;
  snippet: string;
  date: string;
  status: ("high" | "medium" | "draft" | "sent")[];
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "high":
      return "bg-[#E53935] text-[#FCA6A0] border";
    case "medium":
      return "bg-[#F9A825] text-[#FCA6A0 border";
    case "draft":
      return "bg-[#002328] text-[#545D5E] border";
    case "sent":
      return "bg-[#43A047] text-[#FEFEFE] border";
    default:
      return "bg-white text-black border";
  }
};

const AnnouncementCard: FC<AnnouncementCardProps> = ({
  title,
  snippet,
  date,
  status,
}) => {
  return (
    <div className="border border-white/30 p-4 rounded-lg text-white mb-4 font-poppins">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-1xl text-neutral-400">{snippet}</p>
          <p className="text-1xl mt-2 text-neutral-400">{date}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {status.map((s) => (
              <span
                key={s}
                className={`text-sm px-2 py-1 rounded-3xl ${getStatusColor(
                  s
                )}`}>
                {s}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="p-1 ">
              <SquarePen />
            </button>
            {status.includes("draft") && (
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-[#001B1E]">
                <Send />
                <span>send</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;

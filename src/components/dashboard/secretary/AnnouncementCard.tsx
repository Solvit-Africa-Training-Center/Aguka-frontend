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
      return "bg-[#E53935] text-[#FCA6A0] border border-neutral-700";
    case "medium":
      return "bg-[#F9A825] text-[#222] border border-neutral-700";
    case "draft":
      return "bg-[#002328] text-[#AAB3B3] border border-neutral-700";
    case "sent":
      return "bg-[#43A047] text-[#FEFEFE] border border-neutral-700";
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
    <div className="border border-white/20 p-3 sm:p-4 rounded-lg text-white mb-4 font-poppins bg-primary-400/5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 break-words">
            {snippet}
          </p>
          <p className="text-xs sm:text-sm mt-2 text-neutral-400">{date}</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex flex-wrap gap-2">
            {status.map((s) => (
              <span
                key={s}
                className={`text-xs sm:text-sm px-2 py-1 rounded-full ${getStatusColor(
                  s
                )}`}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Edit announcement"
              className="p-2 rounded hover:bg-white/5 transition-colors"
            >
              <SquarePen className="w-4 h-4" />
            </button>

            {status.includes("draft") && (
              <button
                aria-label="Send announcement"
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#001B1E] text-sm hover:opacity-90 transition"
              >
                <Send className="w-4 h-4" />
                <span className="capitalize">send</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;

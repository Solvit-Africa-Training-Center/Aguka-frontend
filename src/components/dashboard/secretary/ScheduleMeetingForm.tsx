import React, { useState } from "react";
import { useCreateAnnouncementMutation } from "@services/api/announcementApi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Plus } from "lucide-react";

type MeetingFormData = {
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
};

interface ScheduleMeetingFormProps {
  className?: string; // ✅ Add this
}

const ScheduleMeetingForm: React.FC<ScheduleMeetingFormProps> = ({ className }) => {
  const [formData, setFormData] = useState<MeetingFormData>({
    title: "",
    date: "",
    time: "",
    location: "",
    agenda: "",
  });

  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAnnouncement({
        title: formData.title,
        meetingDate: formData.date,
        meetingTime: formData.time,
        location: formData.location,
        agenda: formData.agenda,
      }).unwrap();

      alert("Meeting scheduled successfully ✅");

      setFormData({ title: "", date: "", time: "", location: "", agenda: "" });
    } catch (error) {
      console.error("Failed to schedule meeting:", error);
      alert("Error scheduling meeting");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", date: "", time: "", location: "", agenda: "" });
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <button
          className={`flex gap-2 bg-white text-primary-300 p-4 rounded-md text-1xl hover:bg-gradient-to-l from-primary-200 to-primary-700 hover:text-white font-bold ${className}`}
        >
          <Plus className="w-6 h-6" />
          <span>Schedule Meeting</span>
        </button>
      </DialogTrigger>

      <DialogContent className="p-12 sm:max-w-[35rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule New Meeting</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... rest of your form inputs ... */}

          <div className="flex justify-between gap-4 mt-6">
            <DialogClose asChild>
              <button
                type="button"
                onClick={handleCancel}
                className="px-20 py-4 border border-[#D4D4D4] font-bold rounded hover:bg-white hover:text-[#00333D]">
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isLoading}
              className="text-nowrap px-10 py-4 font-bold bg-gradient-to-r from-primary-600 to-[#006D75] text-white rounded hover:opacity-90"
            >
              {isLoading ? "Scheduling..." : "Schedule Meeting"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingForm;

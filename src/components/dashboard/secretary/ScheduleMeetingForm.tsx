import React, { useState } from "react";
import { useCreateAnnouncementMutation } from "@services/api/announcementApi";

type MeetingFormData = {
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
};

const ScheduleMeetingForm: React.FC = () => {
  const [formData, setFormData] = useState<MeetingFormData>({
    title: "",
    date: "",
    time: "",
    location: "",
    agenda: "",
  });

  // 🔥 connect to RTK Query mutation
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
      // ✅ Call API
      await createAnnouncement({
        title: formData.title,
        meetingDate: formData.date,
        meetingTime: formData.time,
        location: formData.location,
        agenda: formData.agenda,
        // 👇 if announcements need groupId, pass it here
        // groupId: "your-current-group-id"
      }).unwrap();

      alert("Meeting scheduled successfully ✅");

      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        agenda: "",
      });
    } catch (error) {
      console.error("Failed to schedule meeting:", error);
      alert("Error scheduling meeting ❌");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      agenda: "",
    });
  };

  return (
    <div className="bg-[#00333D] text-white p-6 rounded-md w-full font-poppins">
      <div className="max-w-xl mx-auto pt-40">
        <h2 className="text-2xl font-bold mb-6 text-4xl">
          Schedule New Meeting
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block font-semibold mb-1 text-2xl">
              Meeting Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter meeting title"
              className="w-full p-3 rounded border border-[#D4D4D4] text-white outline-none"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-2xl">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded border border-[#D4D4D4] text-white outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-2xl">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 rounded border border-[#D4D4D4] text-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-2xl">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Meeting Location"
              className="w-full p-3 rounded border text-white border-[#D4D4D4] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-xl">Agenda</label>
            <textarea
              name="agenda"
              value={formData.agenda}
              onChange={handleChange}
              placeholder="Meeting Agenda"
              rows={3}
              className="w-full p-4 rounded border border-[#D4D4D4] text-white outline-none"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-20 py-4 border border-[#D4D4D4] font-bold border-white text-xl rounded hover:bg-white hover:text-[#00333D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 font-bold bg-gradient-to-r text-xl from-primary-600 to-[#006D75] text-white rounded hover:opacity-90"
            >
              {isLoading ? "Scheduling..." : "Schedule Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeetingForm;

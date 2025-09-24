import React, { useState } from 'react';

type MeetingFormData = {
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
};

const ScheduleMeetingForm: React.FC = () => {
  const [formData, setFormData] = useState<MeetingFormData>({
    title: '',
    date: '',
    time: '',
    location: '',
    agenda: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can integrate with backend or state management
    console.log('Meeting Scheduled:', formData);

    // Clear the form (optional)
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      agenda: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      agenda: '',
    });
  };

  return (
    <div className="bg-[#00333D] text-white p-6 rounded-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Schedule New Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-semibold mb-1">Meeting Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter meeting title"
            className="w-full p-2 rounded bg-[#004652] text-white outline-none"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#004652] text-white outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#004652] text-white outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Meeting Location"
            className="w-full p-2 rounded bg-[#004652] text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Agenda</label>
          <textarea
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            placeholder="Meeting Agenda"
            rows={3}
            className="w-full p-2 rounded bg-[#004652] text-white outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#00333D]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-white rounded hover:opacity-90"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleMeetingForm;

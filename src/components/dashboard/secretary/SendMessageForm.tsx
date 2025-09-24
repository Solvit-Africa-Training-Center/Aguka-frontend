import React, { useState } from "react";

type Props = {};

const SendMessageForm: React.FC<Props> = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSendSMS = () => {
    console.log("Sending SMS to:", recipient || "All Members");
    console.log("Message:", message);
    // TODO: integrate with SMS sending logic
  };

  const handleSendEmail = () => {
    console.log("Sending Email to:", recipient || "All Members");
    console.log("Message:", message);
    // TODO: integrate with email sending logic
  };

  return (
    <div className=" text-white p-6 rounded-md w-full mx-auto border border-white/30">
      <h2 className="text-2xl font-bold mb-4 text-secondary-400">
        Send New Message
      </h2>

      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient (or 'All Members')"
        className="w-full p-3 rounded mb-4 border border-white/30 text-white placeholder-white/70 focus:outline-none"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        rows={5}
        className="w-full p-3 rounded mb-4 border border-white/30 text-white placeholder-white/70 outline-none resize-none"
      />

      <div className="flex gap-4 justify-between">
        <button
          onClick={handleSendSMS}
          className="flex-1 border border-white py-2 rounded hover:bg-white hover:text-[#00333D] font-semibold">
          Send SMS
        </button>

        <button
          onClick={handleSendEmail}
          className="flex-1 bg-[#001F24] py-2 rounded hover:opacity-90 font-semibold">
          Send an Email
        </button>
      </div>
    </div>
  );
};

export default SendMessageForm;

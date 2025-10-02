import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSendEmailMutation } from "@services/api/EmailApi";

interface Props {
  onSend: (
    title: string,
    recipients: string | number,
    channel: "SMS" | "Email"
  ) => void;
}

const SendMessageForm: React.FC<Props> = ({ onSend }) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const handleSendSMS = () => {
    toast.info("SMS sending logic is not implemented yet.");
    onSend(message, recipient || "All Members", "SMS");
    setRecipient("");
    setMessage("");
  };

  const handleSendEmail = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    try {
      await sendEmail({
        to: recipient || "all",
        subject: "Group Announcement",
        message,
      }).unwrap();

      toast.success("Email sent successfully!");
      onSend(message, recipient || "All Members", "Email");
      setRecipient("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email. Try again.");
    }
  };

  return (
    <div className="text-white p-6 rounded-md w-full mx-auto border border-white/30">
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
          disabled={isLoading}
          className="flex-1 bg-[#001F24] py-2 rounded hover:opacity-90 font-semibold">
          {isLoading ? "Sending..." : "Send an Email"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SendMessageForm;

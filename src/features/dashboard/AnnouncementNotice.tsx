import CommunicationHistory from "@components/dashboard/secretary/CommunicationHistory";
import GroupAnnouncements from "@components/dashboard/secretary/GroupAnnouncements";

const AnnouncementNotice = () => {
  return (
    <div className="bg-[#003B42] p-30">
      <div className="pt-15">
        <CommunicationHistory />
        <GroupAnnouncements />
        
      </div>
    </div>
  );
};

export default AnnouncementNotice;

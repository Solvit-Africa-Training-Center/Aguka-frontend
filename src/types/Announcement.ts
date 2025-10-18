// types/Announcement.ts

export interface Announcement {
  id: string;
  title: string;
  meetingDate: string; // format: YYYY-MM-DD
  meetingTime: string; // format: HH:MM
  location: string;
  agenda: string;
  createdAt: string;
  updatedAt: string;
  groupId: string; // Add this line
}

export interface AnnouncementCreate {
  title: string;
  meetingDate: string;
  meetingTime: string;
  location: string;
  agenda: string;
}

export interface AnnouncementUpdate {
  title?: string;
  meetingDate?: string;
  meetingTime?: string;
  location?: string;
  agenda?: string;
}

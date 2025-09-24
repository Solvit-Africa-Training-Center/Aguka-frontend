// features/announcement/announcementSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Announcement } from "types/Announcement";

interface AnnouncementState {
  announcements: Announcement[];
  selectedAnnouncement: Announcement | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  selectedAnnouncement: null,
  loading: false,
  error: null,
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.announcements = action.payload;
    },

    addAnnouncement: (state, action: PayloadAction<Announcement>) => {
      state.announcements.push(action.payload);
    },

    updateAnnouncementLocal: (state, action: PayloadAction<Announcement>) => {
      const index = state.announcements.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.announcements[index] = action.payload;
      }
    },

    deleteAnnouncementLocal: (state, action: PayloadAction<string>) => {
      state.announcements = state.announcements.filter(a => a.id !== action.payload);
    },

    selectAnnouncement: (state, action: PayloadAction<Announcement | null>) => {
      state.selectedAnnouncement = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAnnouncements,
  addAnnouncement,
  updateAnnouncementLocal,
  deleteAnnouncementLocal,
  selectAnnouncement,
  setLoading,
  setError,
} = announcementSlice.actions;

export default announcementSlice.reducer;

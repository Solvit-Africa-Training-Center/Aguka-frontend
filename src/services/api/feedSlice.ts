import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Feed } from "types/Feed";

interface FeedState {
  feeds: Feed[];
  selectedFeed: Feed | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feeds: [],
  selectedFeed: null,
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    // Set all feeds
    setFeeds: (state, action: PayloadAction<Feed[]>) => {
      state.feeds = action.payload;
    },

    // Add one feed
    addFeed: (state, action: PayloadAction<Feed>) => {
      state.feeds.push(action.payload);
    },

    // Update one feed
    updateFeedLocal: (state, action: PayloadAction<Feed>) => {
      const index = state.feeds.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.feeds[index] = action.payload;
      }
    },

    // Delete a feed
    deleteFeedLocal: (state, action: PayloadAction<string>) => {
      state.feeds = state.feeds.filter((f) => f.id !== action.payload);
    },

    // Select a feed
    selectFeed: (state, action: PayloadAction<Feed | null>) => {
      state.selectedFeed = action.payload;
    },

    // Handle loading and errors
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFeeds,
  addFeed,
  updateFeedLocal,
  deleteFeedLocal,
  selectFeed,
  setLoading,
  setError,
} = feedSlice.actions;

export default feedSlice.reducer;

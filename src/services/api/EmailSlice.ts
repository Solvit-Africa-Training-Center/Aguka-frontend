import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EmailState {
  // lastSent: SendEmailResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  // lastSent: null,
  loading: false,
  error: null,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    sendEmailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // sendEmailSuccess: (state, action: PayloadAction<SendEmailResponse>) => {
    //   state.lastSent = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    sendEmailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearEmailState: (state) => {
      // state.lastSent = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  sendEmailStart,
  // sendEmailSuccess,
  sendEmailFailure,
  clearEmailState,
} = emailSlice.actions;

export default emailSlice.reducer;

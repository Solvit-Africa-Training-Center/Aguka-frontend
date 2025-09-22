// src/services/api/emailApi.ts
import { apiSlice } from "./apiSlice";
import type { SendEmailRequest, SendEmailResponse } from "../../types/email";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation<SendEmailResponse, SendEmailRequest>({
      query: (emailData) => ({
        url: "/send-email",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSendEmailMutation } = emailApi;

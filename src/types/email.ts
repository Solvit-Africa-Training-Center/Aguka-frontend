// src/types/email.ts

export interface SendEmailRequest {
  to: string;         // recipient email
  subject: string;    // subject line
  message: string;    // email body (plain text or HTML)
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

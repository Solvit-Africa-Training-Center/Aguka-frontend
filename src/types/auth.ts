export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordState {
  isLoading: boolean;
}
export interface ResetPasswordForm {
  phoneNumber: string;
  groupId: string;
}

export interface ResetPasswordErrors {
  phoneNumber?: string;
  groupId?: string;
}

export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}
// types/auth.ts
export interface GroupCreation {
  name: string;
  description?: string;
  location: string[]; // keep as string[] per your model
  profilePicture?: File | null;
  meetingLocation?: string;
  interestRate?: number;
  contact?: string;
  email?: string;
  minContribution: number;
  agreementTerms?: File | null;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  groupId?: string;
  location?: string[] | string;
  meetingLocation?: string;
  interestRate?: number;
  contact?: string;
  email?: string;
  minContribution?: number;
  createdAt?: string;
  token?: string;
  role?: string;
  user?: any;
}

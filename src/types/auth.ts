export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordState {
  isLoading: boolean;
}
export interface ResetPasswordForm {
  phone: string;
  groupId: string;
}

export interface ResetPasswordErrors {
  phone?: string;
  groupId?: string;
}


export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}

export interface GroupCreation {
  name: string;
  description: string;
  location: string;
  profilePicture?: File | null;
  meetingLocation?: string;
  interestRate?: number;
  contact?: string;
  email?: string;
  minContribution: number;
  agreementTerms?: File | null;
}
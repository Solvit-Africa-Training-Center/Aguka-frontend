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
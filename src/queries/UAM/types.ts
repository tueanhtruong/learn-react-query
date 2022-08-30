export interface SignUpPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface SignInPayload {
  username: string;
  password: string;
}

export interface ConfirmSignUpPayload {
  username: string;
  code: string;
}

export interface ResendSignUpPayload {
  username: string;
}

export interface SubmitForgotPasswordPayload {
  email: string;
  token: string;
  password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ChangePasswordPayload {
  user: any;
  currentPassword: string;
  newPassword: string;
}

export interface ConfirmSignInPayload {
  code: string;
  user: any;
}

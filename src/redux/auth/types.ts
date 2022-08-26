export interface AuthUser {
  email: string;
  image: string;
  name: string;
  emailPasswordAuthentication?: boolean;
  uid: string;
}
export interface SignUpPayload {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username: string;
}
export interface ConfirmSignUpPayload {
  userCredential?: any;
  username?: string;
  code?: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export type Permission = 'WEB_ADMIN:AUTH' | string;

export type ChangePasswordPayload = {
  user: any;
  currentPassword: string;
  newPassword: string;
};
export type User = {
  email: string;
  emailVerified: boolean;
  lastName: string;
  firstName: string;
};

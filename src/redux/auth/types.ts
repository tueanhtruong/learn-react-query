export interface AuthUser {
  email: string;
  image: string;
  name: string;
  emailPasswordAuthentication?: boolean;
  uid: string;
}

export type Permission = 'WEB_ADMIN:AUTH' | string;

export interface User {
  id: string;
  primaryTravelerId: string;
  settings: any[];
  userRoles: UserRole[];
}

export interface UserRole {
  createdDate: Date;
  userId: string;
  roleId: number;
  role: Role;
}

export interface Role {
  createdDate: Date;
  id: number;
  name: string;
  description: null;
}

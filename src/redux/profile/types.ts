export interface Profile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country?: string;
  countryId: number;
  city: string;
  state?: string;
  stateId: number;
  zipCode: string;
  department?: string;
  departmentId: number;
  directManager?: DirectManager;
  avatarUrl?: string;
}

export interface DirectManager {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
}

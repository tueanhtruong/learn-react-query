import { UseQueryOptions } from 'react-query';

export enum API_QUERIES {
  PROFILE = '/me',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  CONFIRM_SIGN_UP = '/confirm-sign-up',
  RESEND_SIGN_UP = '/resend-sign-up',
  SIGN_OUT = '/sign_out',
  CONTENT = '/content',
  TRAVELER = '/travelers',
  TRIPS = '/trips',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };

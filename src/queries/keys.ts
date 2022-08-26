import { UseQueryOptions } from 'react-query';

export enum API_QUERIES {
  PROFILE = '/me',
  SIGN_IN = '/sign-in',
  SIGN_OUT = '/sign_out',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };

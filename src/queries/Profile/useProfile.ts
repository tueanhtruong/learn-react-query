import { QueryFunction, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { User } from './types';

export function useProfile(options?: UseQueryOptions<User, Error>) {
  const handleGetProfile: QueryFunction<User, API_QUERIES> = () =>
    responseWrapper<User>(apiClient.getMyProfile);
  const {
    data: profile,
    error,
    isError,
    isFetching,
    refetch: getMyProfile,
  } = useQuery<User, Error>(API_QUERIES.PROFILE, {
    queryFn: handleGetProfile,
    refetchOnMount: false,
    enabled: false,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleSetProfile = (value: User) => queryClient.setQueryData(API_QUERIES.PROFILE, value);

  return {
    profile,
    error,
    isError,
    loading: isFetching,
    getMyProfile,
    handleSetProfile,
  };
}

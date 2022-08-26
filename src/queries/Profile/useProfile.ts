import { QueryFunction, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { Profile } from 'src/redux/profile/types';
import api from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';

export function useProfile(options?: UseQueryOptions<unknown, Error, Profile, API_QUERIES>) {
  const handleGetProfile: QueryFunction<Profile, API_QUERIES> = (params) =>
    responseWrapper<Profile>(api.getMyProfile);
  const {
    data: profile,
    error,
    isError,
    isFetching,
    refetch: getMyProfile,
  } = useQuery<unknown, Error, Profile, API_QUERIES>(API_QUERIES.PROFILE, {
    queryFn: handleGetProfile,
    refetchOnMount: false,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleSetProfile = (value: Profile) => queryClient.setQueryData(API_QUERIES.PROFILE, value);

  return {
    profile,
    error,
    isError,
    loading: isFetching,
    getMyProfile,
    handleSetProfile,
  };
}

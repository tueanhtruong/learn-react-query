import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { Traveler } from './types';

export function useTravelers(options?: UseQueryOptions<Traveler[], Error>) {
  const {
    data: travelers,
    error,
    isError,
    isFetching,
    refetch: getTravelers,
  } = useQuery<Traveler[], Error>(API_QUERIES.TRAVELER, {
    queryFn: () => responseWrapper<Traveler[]>(apiClient.getAllTravelers),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleSetStaleData = () => queryClient.invalidateQueries(API_QUERIES.TRAVELER);

  return {
    travelers,
    error,
    isError,
    loading: isFetching,
    getTravelers,
    handleSetStaleData,
  };
}

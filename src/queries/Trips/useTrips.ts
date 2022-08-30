import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { Trip } from './types';

type ResponseType = {
  data: Trip[];
};

export function useTrips(options?: UseQueryOptions<ResponseType, Error, Trip[]>) {
  const {
    data: trips,
    error,
    isError,
    isFetching,
    refetch: getTrips,
  } = useQuery<ResponseType, Error, Trip[]>(API_QUERIES.TRIPS, {
    queryFn: () => responseWrapper<ResponseType>(apiClient.getAllTrips),
    select: (data) => data.data,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleSetStaleTripData = () => queryClient.invalidateQueries(API_QUERIES.TRIPS);

  return {
    trips,
    error,
    isError,
    loading: isFetching,
    getTrips,
    handleSetStaleTripData,
  };
}

import { useQuery, UseQueryOptions } from 'react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { Trip } from './types';

export function useTripDetail(options?: UseQueryOptions<Trip, Error> & { id: string }) {
  const {
    data: trip,
    error,
    isError,
    isFetching,
    refetch: getTripDetail,
  } = useQuery<Trip, Error>([API_QUERIES.TRIPS, options.id], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper(apiClient.getTripDetail, params);
    },
    ...options,
  });

  return {
    trip,
    error,
    isError,
    loading: isFetching,
    getTripDetail,
  };
}

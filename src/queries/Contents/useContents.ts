import { useQuery, UseQueryOptions } from 'react-query';
import { ContentStore } from 'src/redux/content/types';
import apiClient from '../apiClient';
import { responseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';

export function useContents(options?: UseQueryOptions<ContentStore, Error>) {
  const {
    data: contents,
    error,
    isError,
    isFetching,
    refetch: getContents,
  } = useQuery<ContentStore, Error>(API_QUERIES.CONTENT, {
    queryFn: () => responseWrapper<ContentStore>(apiClient.getContent),
    enabled: false,
    ...options,
  });

  return {
    contents,
    error,
    isError,
    loading: isFetching,
    getContents,
  };
}

import { useMutation, UseMutationOptions } from 'react-query';
import api from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
// < return Data, Error, Payload Type, Context Types >
export function useLogout(options?: UseMutationOptions<any, Error, void>) {
  const { mutate, isLoading } = useMutation<any, Error, void>({
    mutationKey: API_QUERIES.SIGN_OUT,
    mutationFn: () => authResponseWrapper(api.signOut),
    ...options,
  });

  return {
    logout: mutate,
    isLoggingOut: isLoading,
  };
}

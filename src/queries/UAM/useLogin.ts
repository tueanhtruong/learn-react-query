import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { SignInPayload } from './types';
// < return Data, Error, Payload Type, Context Types >
export function useLogin(options?: UseMutationOptions<any, Error, SignInPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, SignInPayload>({
    mutationKey: API_QUERIES.SIGN_IN,
    mutationFn: (payload: SignInPayload) => authResponseWrapper(apiClient.signIn, [payload]),
    ...options,
  });

  return {
    login: mutate,
    isSigning: isLoading,
  };
}

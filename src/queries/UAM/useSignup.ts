import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { SignUpPayload } from './types';

export function useSignUp(options?: UseMutationOptions<any, Error, SignUpPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, SignUpPayload>({
    mutationKey: API_QUERIES.SIGN_UP,
    mutationFn: (payload: SignUpPayload) => authResponseWrapper(apiClient.signUp, [payload]),
    ...options,
  });

  return {
    signup: mutate,
    isSigningUp: isLoading,
  };
}

import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { ForgotPasswordPayload } from './types';
export function useForgotPassword(options?: UseMutationOptions<any, Error, ForgotPasswordPayload>) {
  const { mutate: forgotPassword, isLoading } = useMutation<any, Error, ForgotPasswordPayload>({
    mutationKey: API_QUERIES.RESEND_SIGN_UP,
    mutationFn: (payload: ForgotPasswordPayload) =>
      authResponseWrapper(apiClient.forgotPassword, [payload]),
    ...options,
  });

  return {
    forgotPassword,
    isLoading,
  };
}

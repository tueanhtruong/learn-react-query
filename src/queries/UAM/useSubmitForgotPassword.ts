import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { SubmitForgotPasswordPayload } from './types';
export function useSubmitForgotPassword(
  options?: UseMutationOptions<any, Error, SubmitForgotPasswordPayload>
) {
  const { mutate: submitForgotPassword, isLoading } = useMutation<
    any,
    Error,
    SubmitForgotPasswordPayload
  >({
    mutationKey: API_QUERIES.RESEND_SIGN_UP,
    mutationFn: (payload: SubmitForgotPasswordPayload) =>
      authResponseWrapper(apiClient.submitForgotPassword, [payload]),
    ...options,
  });

  return {
    submitForgotPassword,
    isLoading,
  };
}

import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { ResendSignUpPayload } from './types';
export function useResendSignUp(options?: UseMutationOptions<any, Error, ResendSignUpPayload>) {
  const { mutate: resendSignUp, isLoading: isResendSignUp } = useMutation<
    any,
    Error,
    ResendSignUpPayload
  >({
    mutationKey: API_QUERIES.RESEND_SIGN_UP,
    mutationFn: (payload: ResendSignUpPayload) =>
      authResponseWrapper(apiClient.resendSignUp, [payload]),
    ...options,
  });

  return {
    resendSignUp,
    isResendSignUp,
  };
}

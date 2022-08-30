import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { ConfirmSignUpPayload } from './types';
export function useConfirmSignUp(options?: UseMutationOptions<any, Error, ConfirmSignUpPayload>) {
  const { mutate: confirmSignUp, isLoading: isConfirmSigningUp } = useMutation<
    any,
    Error,
    ConfirmSignUpPayload
  >({
    mutationKey: API_QUERIES.CONFIRM_SIGN_UP,
    mutationFn: (payload: ConfirmSignUpPayload) =>
      authResponseWrapper(apiClient.confirmSignUp, [payload]),
    ...options,
  });

  return {
    confirmSignUp,
    isConfirmSigningUp,
  };
}

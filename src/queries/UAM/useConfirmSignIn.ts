import { useMutation, UseMutationOptions } from 'react-query';
import apiClient from '../apiClient';
import { authResponseWrapper } from '../helpers';
import { API_QUERIES } from '../keys';
import { ConfirmSignInPayload } from './types';
export function useConfirmSignIn(options?: UseMutationOptions<any, Error, ConfirmSignInPayload>) {
  const { mutate: confirmSignIn, isLoading: isConfirmSigningIn } = useMutation<
    any,
    Error,
    ConfirmSignInPayload
  >({
    mutationKey: API_QUERIES.CONFIRM_SIGN_UP,
    mutationFn: (payload: ConfirmSignInPayload) =>
      authResponseWrapper(apiClient.confirmSignIn, [payload]),
    ...options,
  });

  return {
    confirmSignIn,
    isConfirmSigningIn,
  };
}

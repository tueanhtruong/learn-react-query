import { Toastify } from '.';

const MESSAGES = {
  invalidEmail: 'Email is invalid',
  invalidPhone: 'Phone number is invalid',
  unknown: 'An error has occurred',
  required: 'Field cannot be blank',
  accountNotExist: 'Username does not exist',
  incorrectAccount: 'Incorrect username or password',
  incorrectPassword: 'Incorrect password.', // pragma: allowlist secret
  onlyLetter: 'Only alphabets are allowed for this field.',
};

const handler = (error: AuthError | Error) => {
  console.error(error);
  Toastify.error(error?.message || MESSAGES.unknown);
};
export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException', //pragma: allowlist secret
};
export default {
  handler,
  MESSAGES,
  TYPES,
};

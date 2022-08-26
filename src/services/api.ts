import apisauce from 'apisauce';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { SignInPayload, SignUpPayload } from 'src/redux/auth/types';

import { newCancelToken, stringify } from 'src/utils';
import { TokenService } from '.';

axios.defaults.withCredentials = true;

const create = (baseURL = appConfig.API_URL) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use((config) => {
    return TokenService.getToken()
      .then((token) => {
        config.headers.Authorization = 'Bearer ' + token;
        return Promise.resolve(config);
      })
      .catch(() => {
        return Promise.resolve(config);
      });
  });
  const getRoot = () => api.get('');

  // ====================== Auth ======================
  const signIn = (body: SignInPayload) => Auth.signIn(body.username, body.password);
  const signUp = (body: SignUpPayload) => {
    const params = {
      username: body.username,
      password: body.password,
    };

    const attributes = {
      email: body.username,
      given_name: body.firstName,
      family_name: body.lastName,
    };

    return Auth.signUp({ ...params, attributes });
  };

  // const resendSignUp = (body: ResendSignUpPayload) => Auth.resendSignUp(body.username);

  // const confirmSignUp = (body: ConfirmSignUpPayload) =>
  //   Auth.confirmSignUp(body.username, body.code);

  const signOut = () => Auth.signOut();

  // const getPermission = () => api.get('/me/permission', {}, newCancelToken());

  // const forgotPassword = (body: ForgotPasswordPayload) => Auth.forgotPassword(body.email);

  // const submitForgotPassword = (body: SubmitForgotPasswordPayload) =>
  //   Auth.forgotPasswordSubmit(body.email, body.token, body.password);

  // const changePassword = (body: ChangePasswordPayload) =>
  //   Auth.changePassword(body.user, body.currentPassword, body.newPassword);

  // const confirmSignIn = (body: ConfirmSignInPayload) =>
  //   Auth.sendCustomChallengeAnswer(body.user, body.code);

  // const completeNewPassword = (body: CompleteNewPasswordPayload) =>
  //   Auth.completeNewPassword(body.user, body.password, body.requiredAttributes);

  // ====================== Profile ======================
  const getMyProfile = () => api.get('/me', {}, newCancelToken());
  const getMyNotificationSetting = () =>
    api.get('/me/notification-configuration', {}, newCancelToken());
  const updateMyNotificationSetting = (body) =>
    api.put('/me/notification-configuration', body, newCancelToken());
  // const updateMyProfile = (param: ProfilePayload) => api.put('/me', param, newCancelToken());
  const updateUserAvatar = (body: { avatarUrl: string }) =>
    api.patch(`/me/avatar`, body, newCancelToken());

  // ====================== Content ======================
  // const getContent = () => api.get('/content', {}, newCancelToken());
  const getContent = () => api.get('/contents', {}, newCancelToken());

  const getContentDepartments = () => api.get('/contents/departments', {}, newCancelToken());
  const getContentCountries = () => api.get('/contents/countries', {}, newCancelToken());
  const getContentStates = () => api.get('/contents/states', {}, newCancelToken());

  // ====================== File ======================
  // const getPresignedUserServiceUrl = (params: GetPresignedPayload) =>
  //   api.get('/files/presigned-upload-url', params, newCancelToken());
  // const uploadFile = (body: UploadFilePayload) => axios.put(body.url, body.fileData);

  const getDecodeUserServiceUrl = (params: { filePath: string }) =>
    api.get('/files/presigned-download-url', params, newCancelToken());

  // const uploadFileWithProgress = (body: UploadFilePayload, callback: Callback) =>
  //   axios.put(body.url, body.fileData, {
  //     headers: {
  //       'Content-Type': getFileType(body.fileData),
  //     },
  //     onUploadProgress: (progress) => {
  //       const { loaded, total } = progress;
  //       const percentageProgress = Math.floor((loaded / total) * 100);
  //       callback({ id: body.id, progress: percentageProgress });
  //     },
  //   });

  // ====================== System Accounts ======================
  const searchUserAccounts = (params: { search: string }) => {
    const queryString = stringify(params);
    return api.get(`/users/search?${queryString}`, {}, newCancelToken());
  };
  const searchUserAccountsAxios = (params: { search: string; skip: number; take: number }) => {
    const queryString = stringify(params);
    return api.get(`${appConfig.API_URL}/users/search?${queryString}`, {}, newCancelToken());
  };
  const searchUserAccountsByOrderAxios = (params: {
    search: string;
    skip: number;
    take: number;
    order: string;
  }) => {
    const queryString = stringify(params);
    return api.get(`${appConfig.API_URL}/users/search?${queryString}`, {}, newCancelToken());
  };

  // ====================== Events ======================
  const getAllEvents = () => api.get('/events', {}, newCancelToken());
  const getMyEvents = () => api.get('/events/me', {}, newCancelToken());
  const getMyEventDetail = (params: { id: string }) =>
    api.get(`/events/me/${params.id}`, {}, newCancelToken());
  const addNewEvent = (params: { id: string }) =>
    api.post(`/events/${params.id}/register`, {}, newCancelToken());

  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,
    // ====================== Auth ======================
    // getPermission,
    // confirmSignIn,
    signIn,
    signUp,
    // resendSignUp,
    // confirmSignUp,
    signOut,
    // forgotPassword,
    // submitForgotPassword,
    // changePassword,
    // completeNewPassword,

    // ====================== File ======================
    // getPresignedUserServiceUrl,
    // uploadFile,
    // uploadFileWithProgress,
    getDecodeUserServiceUrl,

    // ====================== Content ======================
    getContent,
    getContentDepartments,
    getContentCountries,
    getContentStates,

    // ====================== Profile ======================
    getMyProfile,
    // updateMyProfile,
    updateUserAvatar,
    getMyNotificationSetting,
    updateMyNotificationSetting,

    // ====================== System Accounts ======================
    searchUserAccounts,
    searchUserAccountsAxios,
    searchUserAccountsByOrderAxios,
    // ====================== Events ======================
    getAllEvents,
    getMyEventDetail,
    getMyEvents,
    addNewEvent,
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};

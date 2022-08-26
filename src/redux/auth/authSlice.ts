import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SignInPayload, SignUpPayload, User } from './types';
// import { User } from 'firebase/auth';

export interface IAuthState {
  isAuthenticated?: boolean;
  isAdmin: boolean;
  cognitoUser?: User;
  loading: boolean;
  isCorrectRoute: boolean;
  error: Error;
  isCompleteNewPasswordSuccess: boolean;
  isResetPasswordSuccess: boolean;
  resetPasswordEmail: string;
}

const initialState: IAuthState = {
  isAuthenticated: null,
  cognitoUser: undefined,
  loading: false,
  isCorrectRoute: false,
  isAdmin: false,
  error: null,
  isCompleteNewPasswordSuccess: false,
  isResetPasswordSuccess: false,
  resetPasswordEmail: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsCorrectRoute: (state, action: PayloadAction<boolean>) => {
      state.isCorrectRoute = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsAdminRole: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setCompleteNewPassword: (state, action: PayloadAction<boolean>) => {
      state.isCompleteNewPasswordSuccess = action.payload;
    },
    setResetPasswordSuccess: (state, action: PayloadAction<boolean>) => {
      state.isResetPasswordSuccess = action.payload;
    },
    setResetPasswordEmail: (state, action: PayloadAction<boolean>) => {
      state.isResetPasswordSuccess = action.payload;
    },
    ////////////////////////////// signInAction //////////////////////////////
    signInAction: (state, action: PayloadAction<SignInPayload | null>) => {
      state.loading = true;
    },
    signInActionSuccess: (state, action: PayloadAction<{ user: User } | null>) => {
      const { user } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.cognitoUser = user;
      // state.cognitoUser = {
      //   email: user.email ?? '',
      //   // image: user.photoURL ?? '',
      //   // name: user.displayName ?? '',
      //   // emailPasswordAuthentication: true,
      //   // uid: user.uid,
      // };
    },
    signInActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// signUpAction //////////////////////////////
    signUpAction: (state, action: PayloadAction<SignUpPayload | null>) => {
      state.loading = true;
    },
    signUpActionSuccess: (state, action: PayloadAction<{ user: User } | null>) => {
      const { user } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.cognitoUser = user;
    },
    signUpActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// signOutAction //////////////////////////////
    signOutAction: (state) => {
      state.loading = true;
    },
    signOutActionSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.cognitoUser = undefined;
      state.isAdmin = false;
    },
    signOutActionFailed: (state) => {
      state.loading = false;
    },
    ////////////////////////////// sendEmailVerificationAction //////////////////////////////
    sendEmailVerificationAction: (state, action: PayloadAction<{ user: any } | null>) => {
      state.loading = true;
    },
    sendEmailVerificationSuccess: (state) => {
      state.loading = false;
    },
    sendEmailVerificationFailed: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthenticated,
  setIsCorrectRoute,
  setIsAdminRole,
  setCompleteNewPassword,
  setResetPasswordSuccess,
  setResetPasswordEmail,
  ////////////////////////////// signInAction //////////////////////////////
  signInAction,
  signInActionFailed,
  signInActionSuccess,
  ////////////////////////////// signUpAction //////////////////////////////
  signUpAction,
  signUpActionSuccess,
  signUpActionFailed,
  ////////////////////////////// sendEmailVerificationAction //////////////////////////////
  sendEmailVerificationAction,
  sendEmailVerificationSuccess,
  sendEmailVerificationFailed,
  ////////////////////////////// signOutAction //////////////////////////////
  signOutAction,
  signOutActionFailed,
  signOutActionSuccess,
} = authSlice.actions;

export const authState = authSlice.getInitialState();

export default authSlice.reducer;

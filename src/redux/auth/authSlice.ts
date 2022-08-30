import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from './types';

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
} = authSlice.actions;

export const authState = authSlice.getInitialState();

export default authSlice.reducer;

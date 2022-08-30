import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  isAuthenticated?: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticated } = authSlice.actions;

export const authState = authSlice.getInitialState();

export default authSlice.reducer;

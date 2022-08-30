import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Profile } from './types';

export interface IProfileState {
  selectedProfile?: Profile;
}

const initialState: IProfileState = {
  selectedProfile: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSelectedProfile: (state, action: PayloadAction<Profile>) => {
      state.selectedProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedProfile } = profileSlice.actions;

export const profileState = profileSlice.getInitialState();

export default profileSlice.reducer;

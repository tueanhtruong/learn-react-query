import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IContentState {
  loading: boolean;
  screenWidth: number;
  collapseSidebar: boolean;
  showMiniSidebar: boolean;
  showSidebar: boolean;
  showNavbar: boolean;
}

const initialState: IContentState = {
  loading: false,
  screenWidth: 0,
  collapseSidebar: false,
  showMiniSidebar: false,
  showSidebar: false,
  showNavbar: false,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },
    setCollapseSidebar: (state, action: PayloadAction<boolean>) => {
      state.collapseSidebar = action.payload;
    },
    setShowMiniSidebar: (state, action: PayloadAction<boolean>) => {
      state.showMiniSidebar = action.payload;
    },
    setShowNavbar: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setScreenWidth,
  setCollapseSidebar,
  setShowMiniSidebar,
  setShowNavbar,
  setShowSidebar,
} = contentSlice.actions;

export const contentState = contentSlice.getInitialState();

export default contentSlice.reducer;

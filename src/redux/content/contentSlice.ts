import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from './types';

export interface IContentState {
  value: number;
  todoList: Todo[];
  loading: boolean;
  screenWidth: number;
  collapseSidebar: boolean;
  showMiniSidebar: boolean;
  showSidebar: boolean;
  showNavbar: boolean;
}

const initialState: IContentState = {
  value: 0,
  todoList: [],
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
    incrementValue: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrementValue: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    getTodoListAction: (state) => {
      state.loading = true;
    },
    getTodoListActionSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todoList = action.payload;
    },
    setCollapseSidebar: (state, action: PayloadAction<boolean>) => {
      state.collapseSidebar = action.payload;
    },
    setShowMiniSidebar: (state, action: PayloadAction<boolean>) => {
      state.showMiniSidebar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setScreenWidth,
  incrementValue,
  decrementValue,
  incrementByAmount,
  getTodoListAction,
  getTodoListActionSuccess,
  setCollapseSidebar,
  setShowMiniSidebar,
} = contentSlice.actions;

export const contentState = contentSlice.getInitialState();

export default contentSlice.reducer;

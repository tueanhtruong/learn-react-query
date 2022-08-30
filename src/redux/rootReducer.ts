import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { authState, IAuthState } from './auth/authSlice';

import commonReducer, { commonState, ICommonState } from './common/commonSlice';
import fileReducer, { fileState, IFileState } from './file/fileSlice';
import modalReducer, { IModalState, modalState } from './modal/modalSlice';

export interface IRootState {
  router: RouterState;
  common: ICommonState;
  auth: IAuthState;
  modal: IModalState;
  file: IFileState;
}

export const rootState: IRootState = {
  router: undefined,
  auth: authState,
  common: commonState,
  modal: modalState,
  file: fileState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = (history: History) => {
  return combineReducers<IRootState>({
    router: connectRouter(history),
    common: commonReducer,
    auth: authReducer,
    modal: modalReducer,
    file: fileReducer,
  });
};

export default createRootReducer;

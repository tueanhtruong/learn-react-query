import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { authState, IAuthState } from './auth/authSlice';
// import configurationReducer, {
//   configurationState,
//   IConfigurationState,
// } from './configuration/configurationSlice';
import contentReducer, { contentState, IContentState } from './content/contentSlice';
import fileReducer, { fileState, IFileState } from './file/fileSlice';
import modalReducer, { IModalState, modalState } from './modal/modalSlice';
// import orderReducer, { IOrderState, orderState } from './order/orderSlice';
import profileReducer, { IProfileState, profileState } from './profile/profileSlice';
// import shopReducer, { IShopState, shopState } from './shop/shopSlice';

export interface IRootState {
  router: RouterState;
  content: IContentState;
  auth: IAuthState;
  // configuration: IConfigurationState;
  profile: IProfileState;
  modal: IModalState;
  file: IFileState;
  // shop: IShopState;
  // order: IOrderState;
}

export const rootState: IRootState = {
  router: undefined,
  auth: authState,
  content: contentState,
  // configuration: configurationState,
  profile: profileState,
  modal: modalState,
  file: fileState,
  // shop: shopState,
  // order: orderState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = (history: History) => {
  return combineReducers<IRootState>({
    router: connectRouter(history),
    content: contentReducer,
    auth: authReducer,
    // configuration: configurationReducer,
    profile: profileReducer,
    modal: modalReducer,
    file: fileReducer,
    // shop: shopReducer,
    // order: orderReducer,
  });
};

export default createRootReducer;

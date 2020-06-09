import { StoreActionTypes, UIActionTypes } from '../../types/store/actionTypes';
import { UIActions } from 'src/types/store/uiActions';
import { tPosition } from 'src/types/types';

export const startAction = (name: StoreActionTypes, params?: {}): UIActions => ({
  type: UIActionTypes.START_ACTION,
  payload: {
    action: {
      name,
      params
    }
  }
});

export const stopAction = (name: StoreActionTypes): UIActions => ({
  type: UIActionTypes.STOP_ACTION,
  payload: { name }
});

export const refreshActionStart = (refreshAction: StoreActionTypes): UIActions => ({
  type: UIActionTypes.REFRESH_ACTION_START,
  payload: { refreshAction }
});

export const refreshActionStop = (refreshAction: StoreActionTypes): UIActions => ({
  type: UIActionTypes.REFRESH_ACTION_STOP,
  payload: { refreshAction }
});

export const togglePopupMessage = (message: string, position?: tPosition): UIActions => ({
  type: UIActionTypes.TOGGLE_POPUP_MESSAGE,
  payload: {
    message,
    position
  }
});

export const addErrorAction = (errorAction: StoreActionTypes): UIActions => ({
  type: UIActionTypes.ADD_ERROR_ACTION,
  payload: { errorAction }
});

export const clearErrorActions = (): UIActions => ({
  type: UIActionTypes.CLEAR_ERROR_ACTIONS,
  payload: {}
});

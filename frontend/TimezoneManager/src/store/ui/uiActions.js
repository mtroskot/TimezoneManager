import { uiActionTypes } from 'src/constants/actionTypes';
import { ObjectUtils } from 'src/utils';

export const startAction = (name, params) => {
  if (!ObjectUtils.isObject(params)) {
    throw Error(`type of ${typeof params} is not an object`);
  }
  return {
    type: uiActionTypes.START_ACTION,
    payload: {
      action: {
        name,
        params
      }
    }
  };
};

export const stopAction = name => ({
  type: uiActionTypes.STOP_ACTION,
  payload: { name }
});

export const refreshActionStart = refreshAction => ({
  type: uiActionTypes.REFRESH_ACTION_START,
  payload: { refreshAction }
});

export const refreshActionStop = refreshAction => ({
  type: uiActionTypes.REFRESH_ACTION_STOP,
  payload: { refreshAction }
});

export const togglePopupMessage = (message, position) => ({
  type: uiActionTypes.TOGGLE_POPUP_MESSAGE,
  payload: {
    message,
    position
  }
});

export const addErrorAction = errorAction => ({
  type: uiActionTypes.ADD_ERROR_ACTION,
  payload: { errorAction }
});

export const clearErrorActions = () => ({
  type: uiActionTypes.CLEAR_ERROR_ACTIONS,
  payload: {}
});

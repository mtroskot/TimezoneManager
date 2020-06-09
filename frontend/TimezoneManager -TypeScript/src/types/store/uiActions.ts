import { StoreActionTypes, UIActionTypes } from './actionTypes';
import { tPosition } from 'src/types/types';

export interface StartAction {
  type: UIActionTypes.START_ACTION;
  payload: {
    action: { name: StoreActionTypes; params?: {} };
  };
}

export interface StopAction{
  type: UIActionTypes.STOP_ACTION;
  payload: { name: StoreActionTypes };
}

export interface RefreshActionStart {
  type: UIActionTypes.REFRESH_ACTION_START;
  payload: { refreshAction: StoreActionTypes };
}

export interface RefreshActionStopAction {
  type: UIActionTypes.REFRESH_ACTION_STOP;
  payload: { refreshAction: StoreActionTypes };
}

export interface TogglePopupMessageAction {
  type: UIActionTypes.TOGGLE_POPUP_MESSAGE;
  payload: { message: string; position?: tPosition };
}

export interface AddErrorAction {
  type: UIActionTypes.ADD_ERROR_ACTION;
  payload: { errorAction: StoreActionTypes };
}

export interface ClearErrorActionsAction {
  type: UIActionTypes.CLEAR_ERROR_ACTIONS;
  payload: {};
}

export type UIActions =
  | StartAction
  | StopAction
  | RefreshActionStart
  | RefreshActionStopAction
  | TogglePopupMessageAction
  | AddErrorAction
  | ClearErrorActionsAction;

import { iAction } from 'src/types/interfaces';
import { StoreActionTypes, UIActionTypes } from 'src/types/store/actionTypes';
import { tPosition } from 'src/types/types';
import { UIActions } from 'src/types/store/uiActions';

export interface UIState {
  loader: {
    actions: iAction[];
    refreshing: StoreActionTypes[];
  };
  popupMessage: {
    message: string | null;
    position: tPosition;
  };
  errorActions: StoreActionTypes[];
}

export const initialState: UIState = {
  loader: {
    actions: [],
    refreshing: []
  },
  popupMessage: {
    message: null,
    position: null
  },
  errorActions: []
};

const uiReducer = (state = initialState, action: UIActions): UIState => {
  const { loader } = state;
  const { actions, refreshing } = loader;
  switch (action.type) {
    case UIActionTypes.START_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: [...actions, action.payload.action]
        }
      };
    case UIActionTypes.STOP_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: actions.filter((loadingAction) => loadingAction.name !== action.payload.name)
        }
      };
    case UIActionTypes.REFRESH_ACTION_START:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: [...refreshing, action.payload.refreshAction]
        }
      };
    case UIActionTypes.REFRESH_ACTION_STOP:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: refreshing.filter((refresh) => refresh !== action.payload.refreshAction)
        }
      };
    case UIActionTypes.TOGGLE_POPUP_MESSAGE:
      return {
        ...state,
        popupMessage: {
          message: action.payload.message,
          position: action.payload.position
        }
      };
    case UIActionTypes.ADD_ERROR_ACTION:
      return {
        ...state,
        errorActions: [...state.errorActions, action.payload.errorAction]
      };
    case UIActionTypes.CLEAR_ERROR_ACTIONS:
      return {
        ...state,
        errorActions: []
      };
    default:
      return state;
  }
};

export default uiReducer;

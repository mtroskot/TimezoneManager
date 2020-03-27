import { combineReducers } from 'redux';
import userReducer from 'src/store/user/userReducer';
import uiReducer from 'src/store/ui/uiReducer';
import timezoneReducer from 'src/store/timezone/timezoneReducer';
import searchReducer from 'src/store/search/searchReducer';
import { userActionTypes } from 'src/constants/actionTypes';

const appReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  timezone: timezoneReducer,
  search: searchReducer
});

const rootReducer = (state, action) => {
  if (action.type === userActionTypes.LOGOUT_SUCCESS) {
    state = undefined; //redux-store reset
  }
  return appReducer(state, action);
};

export default rootReducer;

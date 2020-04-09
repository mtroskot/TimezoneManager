import { combineReducers } from 'redux';
import userReducer from 'src/store/user/userReducer';
import uiReducer from 'src/store/ui/uiReducer';
import timezoneReducer from 'src/store/timezone/timezoneReducer';
import searchReducer from 'src/store/search/searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  timezone: timezoneReducer,
  search: searchReducer
});

export default rootReducer;

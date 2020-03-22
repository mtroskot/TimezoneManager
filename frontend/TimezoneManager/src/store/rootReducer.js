import { combineReducers } from 'redux';
import userReducer from 'src/store/user/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;

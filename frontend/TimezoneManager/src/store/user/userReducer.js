import { userActionTypes } from 'src/constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    role: null
  },
  accessToken: null,
  refreshToken: null
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken
      };
    case userActionTypes.CHANGE_USER_ROLE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          role: payload.role
        }
      };
    case userActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: payload.updatedUserInfo
      };
    default:
      return state;
  }
};

export default userReducer;

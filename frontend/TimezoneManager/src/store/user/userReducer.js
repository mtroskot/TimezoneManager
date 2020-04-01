import { userActionTypes } from 'src/constants/actionTypes';

export const initialState = {
  isAuthenticated: false,
  user: {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    roles: []
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
          roles: payload.roles
        }
      };
    case userActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: payload.updatedUserInfo
      };
    case userActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken
      };
    default:
      return state;
  }
};

export default userReducer;

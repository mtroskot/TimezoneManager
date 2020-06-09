import { UserActionTypes } from 'src/types/store/actionTypes';
import { UserActions } from 'src/types/store/userActions';
import { iEmptyUser, iUser } from 'src/types/interfaces';

export interface UserState {
  isAuthenticated: boolean;
  user: iUser | iEmptyUser;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: UserState = {
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

const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case UserActionTypes.CHANGE_USER_ROLE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user as iUser,
          roles: action.payload.roles
        }
      };
    case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload.updatedUserInfo
      };
    case UserActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    default:
      return state;
  }
};

export default userReducer;

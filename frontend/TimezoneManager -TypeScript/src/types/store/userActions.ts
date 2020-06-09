import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { UserActionTypes } from 'src/types/store/actionTypes';
import { iRegisterUserForm, iUser, iUserForEdit } from 'src/types/interfaces';

export interface AuthenticateUser {
  type: UserActionTypes.AUTH_USER;
  payload: { emailAddress: string; password: string };
}

interface AuthenticateUserSuccess {
  type: typeof UserActionTypes.AUTH_USER_SUCCESS;
  payload: { user: iUser; accessToken: string; refreshToken: string };
}

export interface RegisterUser {
  type: UserActionTypes.REGISTER_USER;
  payload: { registerData: iRegisterUserForm };
}

export interface LogoutUser {
  type: UserActionTypes.LOGOUT;
  payload: {};
}

export interface ChangeUserRole {
  type: UserActionTypes.CHANGE_USER_ROLE;
  payload: { role: string };
}

interface ChangeUserRoleSuccess {
  type: UserActionTypes.CHANGE_USER_ROLE_SUCCESS;
  payload: { roles: string[] };
}

export interface AuthAutoSignIn {
  type: UserActionTypes.AUTH_AUTO_SIGN_IN;
  payload: { navigation: NavigationScreenProp<NavigationState, NavigationParams> };
}

export interface UpdateUserInfo {
  type: UserActionTypes.UPDATE_USER_INFO;
  payload: { updateUserInfoForm: iUserForEdit };
}

interface UpdateUserInfoSuccess {
  type: UserActionTypes.UPDATE_USER_INFO_SUCCESS;
  payload: { updatedUserInfo: iUser };
}

export interface DeleteUser {
  type: UserActionTypes.DELETE_USER;
  payload: { userId: number };
}

interface DeleteUserSuccess {
  type: UserActionTypes.DELETE_USER_SUCCESS;
  payload: { userId: number };
}

interface RefreshTokenSuccess {
  type: UserActionTypes.REFRESH_TOKEN_SUCCESS;
  payload: { accessToken: string; refreshToken: string };
}

export type UserActions =
  | AuthenticateUser
  | AuthenticateUserSuccess
  | RegisterUser
  | LogoutUser
  | ChangeUserRole
  | ChangeUserRoleSuccess
  | AuthAutoSignIn
  | UpdateUserInfo
  | UpdateUserInfoSuccess
  | DeleteUser
  | DeleteUserSuccess
  | RefreshTokenSuccess;

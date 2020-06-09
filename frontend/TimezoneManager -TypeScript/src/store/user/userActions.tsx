import { UserActionTypes } from 'src/types/store/actionTypes';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { UserActions } from 'src/types/store/userActions';
import { iRegisterUserForm, iUser, iUserForEdit } from 'src/types/interfaces';

export const authenticateUser = (emailAddress: string, password: string): UserActions => ({
  type: UserActionTypes.AUTH_USER,
  payload: { emailAddress, password }
});

export const authenticateUserSuccess = (user: iUser, accessToken: string, refreshToken: string): UserActions => ({
  type: UserActionTypes.AUTH_USER_SUCCESS,
  payload: { user, accessToken, refreshToken }
});

export const registerUser = (registerData: iRegisterUserForm): UserActions => ({
  type: UserActionTypes.REGISTER_USER,
  payload: { registerData }
});

export const logoutUser = (): UserActions => ({
  type: UserActionTypes.LOGOUT,
  payload: {}
});

export const changeUserRole = (role: string): UserActions => ({
  type: UserActionTypes.CHANGE_USER_ROLE,
  payload: { role }
});

export const changeUserRoleSuccess = (roles: string[]): UserActions => ({
  type: UserActionTypes.CHANGE_USER_ROLE_SUCCESS,
  payload: { roles }
});

export const authAutoSignIn = (navigation: NavigationScreenProp<NavigationState>): UserActions => ({
  type: UserActionTypes.AUTH_AUTO_SIGN_IN,
  payload: { navigation }
});

export const updateUserInfo = (updateUserInfoForm: iUserForEdit): UserActions => ({
  type: UserActionTypes.UPDATE_USER_INFO,
  payload: { updateUserInfoForm }
});

export const updateUserInfoSuccess = (updatedUserInfo: iUser): UserActions => ({
  type: UserActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: { updatedUserInfo }
});

export const deleteUser = (userId: number): UserActions => ({
  type: UserActionTypes.DELETE_USER,
  payload: { userId }
});

export const deleteUserSuccess = (userId: number): UserActions => ({
  type: UserActionTypes.DELETE_USER_SUCCESS,
  payload: { userId }
});

export const refreshTokenSuccess = (accessToken: string, refreshToken: string): UserActions => ({
  type: UserActionTypes.REFRESH_TOKEN_SUCCESS,
  payload: { accessToken, refreshToken }
});

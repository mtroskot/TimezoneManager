import { userActionTypes } from 'src/constants/actionTypes';

export const authenticateUser = (emailAddress, password) => ({
  type: userActionTypes.AUTH_USER,
  payload: { emailAddress, password }
});

export const authenticateUserSuccess = (user, accessToken, refreshToken) => ({
  type: userActionTypes.AUTH_USER_SUCCESS,
  payload: { user, accessToken, refreshToken }
});

export const registerUser = registerData => ({
  type: userActionTypes.REGISTER_USER,
  payload: { registerData }
});

export const logoutUser = () => ({
  type: userActionTypes.LOGOUT,
  payload: {}
});

export const logoutUserSuccess = () => ({
  type: userActionTypes.LOGOUT_SUCCESS,
  payload: {}
});

export const changeUserRole = role => ({
  type: userActionTypes.CHANGE_USER_ROLE,
  payload: { role }
});

export const changeUserRoleSuccess = roles => ({
  type: userActionTypes.CHANGE_USER_ROLE_SUCCESS,
  payload: { roles }
});

export const authAutoSignIn = navigation => ({
  type: userActionTypes.AUTH_AUTO_SIGN_IN,
  payload: { navigation }
});

export const updateUserInfo = updateUserInfoForm => ({
  type: userActionTypes.UPDATE_USER_INFO,
  payload: { updateUserInfoForm }
});

export const updateUserInfoSuccess = updatedUserInfo => ({
  type: userActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: { updatedUserInfo }
});

export const deleteUser = userId => ({
  type: userActionTypes.DELETE_USER,
  payload: { userId }
});

export const deleteUserSuccess = userId => ({
  type: userActionTypes.DELETE_USER_SUCCESS,
  payload: { userId }
});

export const refreshTokenSuccess = (accessToken, refreshToken) => ({
  type: userActionTypes.REFRESH_TOKEN_SUCCESS,
  payload: { accessToken, refreshToken }
});

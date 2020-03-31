import { userActionTypes } from 'src/constants/actionTypes';

export function authenticateUser(emailAddress, password) {
  return {
    type: userActionTypes.AUTH_USER,
    payload: { emailAddress, password }
  };
}

export const authenticateUserSuccess = (user, accessToken, refreshToken) => {
  return {
    type: userActionTypes.AUTH_USER_SUCCESS,
    payload: { user, accessToken, refreshToken }
  };
};

export function registerUser(registerData) {
  return {
    type: userActionTypes.REGISTER_USER,
    payload: { registerData }
  };
}

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

export function updateUserInfo(updateUserInfoForm) {
  return {
    type: userActionTypes.UPDATE_USER_INFO,
    payload: { updateUserInfoForm }
  };
}

export function updateUserInfoSuccess(updatedUserInfo) {
  return {
    type: userActionTypes.UPDATE_USER_INFO_SUCCESS,
    payload: { updatedUserInfo }
  };
}

export function deleteUser(userId) {
  return {
    type: userActionTypes.DELETE_USER,
    payload: { userId }
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: userActionTypes.DELETE_USER_SUCCESS,
    payload: { userId }
  };
}

export function refreshTokenSuccess(accessToken, refreshToken) {
  return {
    type: userActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: { accessToken, refreshToken }
  };
}

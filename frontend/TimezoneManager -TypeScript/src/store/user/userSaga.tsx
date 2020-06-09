import { call, put, select, takeLeading } from 'redux-saga/effects';
import {
  authenticateUserSuccess,
  changeUserRoleSuccess,
  deleteUserSuccess,
  logoutUser,
  updateUserInfoSuccess
} from 'src/store/user/userActions';
import { updateSearchedUserInfoSuccess } from 'src/store/search/searchActions';
import { startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { NavigationService } from 'src/services/index';
import ApiService, { authRequests, userRequests } from 'src/services/api';
import { ParseUtils, ValidationUtils } from 'src/utils/index';
import { userInfoSelector, userSelector } from 'src/store/user/userSelectors';
import { getPersistor } from 'src/store/index';
import { eMessages } from 'src/types/enums';
import { eScreenNames, eStackNames } from 'src/types/navigation';
import { UserActionTypes } from 'src/types/store/actionTypes';
import {
  AuthAutoSignIn,
  AuthenticateUser,
  ChangeUserRole,
  DeleteUser,
  LogoutUser,
  RegisterUser,
  UpdateUserInfo
} from 'src/types/store/userActions';

export function* registerUserSaga(action: RegisterUser) {
  try {
    const { registerData } = action.payload;
    yield put(startAction(action.type));
    const response = yield call(ApiService.callApi, authRequests.register(registerData));
    if (response.status === 409) {
      yield put(togglePopupMessage(eMessages.EMAIL_IN_USE, 'top'));
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    } else {
      yield put(togglePopupMessage(eMessages.REGISTRATION_SUCCESS, 'top'));
    }
  } catch (error) {
    console.log('registerUserSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchRegisterUserSaga() {
  yield takeLeading(UserActionTypes.REGISTER_USER, registerUserSaga);
}

export function* authenticateUserSaga(action: AuthenticateUser) {
  try {
    yield put(startAction(action.type));
    const { emailAddress, password } = action.payload;
    const response = yield call(ApiService.callApi, authRequests.login(emailAddress, password));
    if (response.status === 401) {
      yield put(togglePopupMessage(eMessages.LOGIN_FAIL, 'top'));
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    } else {
      const { user, accessToken, refreshToken } = response.data;
      const mappedUser = {
        ...user,
        roles: ParseUtils.parseRoles(user.roles)
      };
      yield put(authenticateUserSuccess(mappedUser, accessToken, refreshToken));
      yield call(NavigationService.navigate, eStackNames.CLOCK_STACK);
    }
  } catch (error) {
    console.log('authenticateUserSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchAuthenticateUserSaga() {
  yield takeLeading(UserActionTypes.AUTH_USER, authenticateUserSaga);
}

export function* changeUserRoleSaga(action: ChangeUserRole) {
  try {
    const { role } = action.payload;
    const user = yield select(userInfoSelector);
    yield put(startAction(action.type));
    const response = yield call(ApiService.callApi, userRequests.changeUserRole(user.id, role));
    yield put(changeUserRoleSuccess(ParseUtils.parseRoles(response.data)));
  } catch (error) {
    console.log('changeUserRoleSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchChangeUserRoleSaga() {
  yield takeLeading(UserActionTypes.CHANGE_USER_ROLE, changeUserRoleSaga);
}

export function* updateUserInfoSaga(action: UpdateUserInfo) {
  try {
    const { updateUserInfoForm } = action.payload;
    const userForUpdateId = updateUserInfoForm.id;
    yield put(startAction(action.type, { id: userForUpdateId }));
    const response = yield call(ApiService.callApi, userRequests.updateUserInfo(updateUserInfoForm));
    const updatedUser = { ...response.data, roles: ParseUtils.parseRoles(response.data.roles) };
    const user = yield select(userInfoSelector);
    //dispatch updateUserInfoSuccess if the user being updated is the current user,
    //without this check we would always update the current user in store
    if (userForUpdateId === user.id) {
      yield put(updateUserInfoSuccess(updatedUser));
    }
    yield put(updateSearchedUserInfoSuccess(updatedUser));
    yield call(NavigationService.navigate, eScreenNames.SEARCH);
  } catch (error) {
    console.log('updateUserInfoSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchUpdateUserInfoSaga() {
  yield takeLeading(UserActionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}

export function* deleteUserSaga(action: DeleteUser) {
  try {
    const { userId } = action.payload;
    yield put(startAction(action.type, { id: userId }));
    yield call(ApiService.callApi, userRequests.deleteUser(userId));
    const user = yield select(userInfoSelector);
    //if the current user deletes his account we need to log him out,
    if (userId === user.id) {
      yield put(logoutUser());
    }
    yield put(deleteUserSuccess(userId));
  } catch (error) {
    console.log('deleteUserSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchDeleteUserSaga() {
  yield takeLeading(UserActionTypes.DELETE_USER, deleteUserSaga);
}

export function* authAutoSignInSaga(action: AuthAutoSignIn) {
  try {
    //when calling navigate from NavigationService the navigatorRef is not set yet,
    // that's why the navigation is explicitly passed
    const { navigation } = action.payload;
    const user = yield select(userSelector);
    if (user.isAuthenticated) {
      yield call(navigation.navigate, eStackNames.CLOCK_STACK);
    } else {
      yield call(navigation.navigate, eStackNames.AUTH_STACK);
    }
  } catch (error) {
    console.log('authAutoSignInSaga error', error);
  }
}

export function* watchAuthAutoSignInSaga() {
  yield takeLeading(UserActionTypes.AUTH_AUTO_SIGN_IN, authAutoSignInSaga);
}

export function* logoutSaga(action: LogoutUser) {
  try {
    yield put(startAction(action.type));
    const user = yield select(userSelector);
    yield call(ApiService.callApi, authRequests.logout(user.refreshToken));
  } catch (error) {
    console.log('logoutSaga logoutUser from server error', error);
  }

  try {
    yield call(getPersistor()!.purge);
    yield call(NavigationService.navigate, eStackNames.AUTH_STACK);
  } catch (error) {
    console.log('logoutSaga logoutUser from frontend error', error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchLogoutSaga() {
  yield takeLeading(UserActionTypes.LOGOUT, logoutSaga);
}

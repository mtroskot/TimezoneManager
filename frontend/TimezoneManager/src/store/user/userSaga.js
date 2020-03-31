import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import {
  authenticateUserSuccess,
  changeUserRoleSuccess,
  deleteUserSuccess,
  logoutUserSuccess,
  updateUserInfoSuccess
} from 'src/store/user/userActions';
import { updateSearchedUserInfoSuccess } from 'src/store/search/searchActions';
import { startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { userActionTypes } from 'src/constants/actionTypes';
import { NavigationService } from 'src/services';
import { DEFAULT_ERROR, EMAIL_IN_USE, LOGIN_FAIL, REGISTRATION_SUCCESS } from 'src/constants/messages';
import ApiService, { authRequests, userRequests } from 'src/services/api';
import { ParseUtils } from 'src/utils';
import { screenNames, stackNames } from 'src/constants/navigation';
import { getPersistor } from 'src/store';
import { userInfoSelector, userSelector } from 'src/store/user/userSelectors';
import { idNames } from 'src/constants/idKeyNames';

export function* registerUserSaga({ type, payload }) {
  try {
    const { registerData } = payload;
    yield put(startAction(type));
    // yield delay(1000);
    const response = yield call(ApiService.callApi, authRequests.register(registerData));
    if (response.status === 409) {
      yield put(togglePopupMessage(EMAIL_IN_USE, 'top'));
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    } else {
      yield put(togglePopupMessage(REGISTRATION_SUCCESS, 'top'));
    }
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('registerUserSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchRegisterUserSaga() {
  yield takeLeading(userActionTypes.REGISTER_USER, registerUserSaga);
}

export function* authenticateUserSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    const { emailAddress, password } = payload;
    // yield delay(1000);
    const response = yield call(ApiService.callApi, authRequests.login(emailAddress, password));
    if (response.status === 401) {
      yield put(togglePopupMessage(LOGIN_FAIL, 'top'));
    } else if (response.status === 400) {
      yield put(togglePopupMessage(response.data.errors[0], 'top'));
    } else {
      const { user, accessToken, refreshToken } = response.data;
      const mappedUser = {
        ...user,
        roles: ParseUtils.parseRoles(user.roles)
      };
      yield put(authenticateUserSuccess(mappedUser, accessToken, refreshToken));
      yield call(NavigationService.navigate, stackNames.CLOCK_STACK);
    }
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('authenticateUserSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchAuthenticateUserSaga() {
  yield takeLeading(userActionTypes.AUTH_USER, authenticateUserSaga);
}

export function* changeUserRoleSaga({ type, payload }) {
  try {
    const { role } = payload;
    const user = yield select(userInfoSelector);
    yield put(startAction(type));
    // yield delay(1000);
    const response = yield call(ApiService.callApi, userRequests.changeUserRole(user.id, role));
    yield put(changeUserRoleSuccess(ParseUtils.parseRoles(response.data)));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('changeUserRoleSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchChangeUserRoleSaga() {
  yield takeLeading(userActionTypes.CHANGE_USER_ROLE, changeUserRoleSaga);
}

export function* updateUserInfoSaga({ type, payload }) {
  try {
    const { updateUserInfoForm } = payload;
    const userForUpdateId = updateUserInfoForm[idNames.USER_ID];
    yield put(startAction(type, { id: userForUpdateId }));
    yield delay(3000);
    const response = yield call(ApiService.callApi, userRequests.updateUserInfo(updateUserInfoForm));
    const updatedUser = { ...response.data, roles: ParseUtils.parseRoles(response.data.roles) };
    const user = yield select(userInfoSelector);
    if (userForUpdateId === user.id) {
      yield put(updateUserInfoSuccess(updatedUser));
    }
    yield put(updateSearchedUserInfoSuccess(updatedUser));
    yield call(NavigationService.navigate, screenNames.SEARCH);
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));

    console.log('updateUserInfoSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchUpdateUserInfoSaga() {
  yield takeLeading(userActionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}

export function* deleteUserSaga({ type, payload }) {
  try {
    const { userId } = payload;
    yield put(startAction(type, { id: userId }));
    // yield delay(1000);
    yield call(ApiService.callApi, userRequests.deleteUser(userId));
    yield put(deleteUserSuccess(userId));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('deleteUserSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchDeleteUserSaga() {
  yield takeLeading(userActionTypes.DELETE_USER, deleteUserSaga);
}

export function* authAutoSignInSaga({ payload }) {
  try {
    //when calling navigate from NavigationService the navigatorRef is not set yet,
    // that's why the navigation is explicitly passed
    const { navigation } = payload;
    const user = yield select(userSelector);
    if (user.isAuthenticated) {
      yield call(navigation.navigate, stackNames.CLOCK_STACK);
    } else {
      yield call(navigation.navigate, stackNames.AUTH_STACK);
    }
  } catch (error) {
    console.log('authAutoSignInSaga error', error);
  }
}

export function* watchAuthAutoSignInSaga() {
  yield takeLeading(userActionTypes.AUTH_AUTO_SIGN_IN, authAutoSignInSaga);
}

export function* logoutSaga({ type }) {
  try {
    yield put(startAction(type));
    const user = yield select(userSelector);
    yield call(ApiService.callApi, authRequests.logout(user.refreshToken));
    yield call(getPersistor().purge);
    yield put(logoutUserSuccess());
    yield call(NavigationService.navigate, stackNames.AUTH_STACK);
  } catch (error) {
    console.log('logoutSaga error', error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchLogoutSaga() {
  yield takeLeading(userActionTypes.LOGOUT, logoutSaga);
}

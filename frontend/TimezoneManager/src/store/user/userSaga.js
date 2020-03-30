import { call, delay, put, select, takeLeading } from 'redux-saga/effects';
import {
  authenticateUserSuccess,
  changeUserRoleSuccess,
  deleteUserSuccess,
  logoutUserSuccess,
  updateUserInfoSuccess
} from 'src/store/user/userActions';
import { startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { userActionTypes } from 'src/constants/actionTypes';
import { NavigationService } from 'src/services';
import { DEFAULT_ERROR, LOGIN_FAIL, REGISTRATION_SUCCESS } from 'src/constants/messages';
import ApiService, { userRequests } from 'src/services/api';
import { screenNames, stackNames } from 'src/constants/navigation';
import { USER } from 'src/constants/userRoles';
import { getPersistor } from 'src/store';
import { userInfoSelector, userSelector } from 'src/store/user/userSelectors';
import { idNames } from 'src/constants/idKeyNames';

export function* registerUserSaga({ type, payload }) {
  try {
    const { registerData } = payload;
    yield put(startAction(type));
    // yield delay(1000);
    const res = yield call(ApiService.callApiAndCheckResponse, userRequests.register(registerData));
    console.log('res', res);
    yield put(togglePopupMessage(REGISTRATION_SUCCESS, 'top'));
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
    // const authResponse = yield call(ApiService.callApiAndCheckResponse, userRequests.login(emailAddress, password));
    let authResponse = null;
    yield delay(1000);
    if (emailAddress.toLowerCase() === 'marko.troskot@hotmail.com' && password.toLowerCase() === 'test123') {
      authResponse = {
        status: 200,
        user: {
          id: 1,
          firstName: 'Marko',
          lastName: 'Troskot',
          emailAddress: 'marko.troskot@hotmail.com',
          role: USER
        },
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      };
    } else if (emailAddress.toLowerCase() === 'error' && password.toLowerCase() === 'error') {
      throw Error();
    } else {
      authResponse = { status: 404 };
    }
    if (authResponse.status === 200) {
      const { user, accessToken, refreshToken } = authResponse;
      yield put(authenticateUserSuccess(user, accessToken, refreshToken));
      yield call(NavigationService.navigate, stackNames.CLOCK_STACK);
    } else {
      yield put(togglePopupMessage(LOGIN_FAIL, 'top'));
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

export function* logoutSaga() {
  try {
    yield call(getPersistor().purge);
    yield put(logoutUserSuccess());
    yield call(NavigationService.navigate, stackNames.AUTH_STACK);
  } catch (error) {
    console.log('logoutSaga error', error);
  }
}

export function* watchLogoutSaga() {
  yield takeLeading(userActionTypes.LOGOUT, logoutSaga);
}

export function* changeUserRoleSaga({ type, payload }) {
  try {
    const { role } = payload;
    yield put(startAction(type));
    yield delay(1000);
    yield put(changeUserRoleSuccess(role));
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

export function* updateUserInfoSaga({ type, payload }) {
  try {
    const { updatedUserInfo } = payload;
    yield put(startAction(type, { id: updatedUserInfo[idNames.USER_ID] }));
    yield delay(3000);
    let userInfo = yield select(userInfoSelector);
    userInfo = {
      ...userInfo,
      firstName: updatedUserInfo.firstName,
      lastName: updatedUserInfo.lastName,
      emailAddress: updatedUserInfo.emailAddress
    };
    yield put(updateUserInfoSuccess(userInfo));
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
    yield delay(1000);
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

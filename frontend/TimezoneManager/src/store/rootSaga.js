import { all } from 'redux-saga/effects';
import {
  watchAuthAutoSignInSaga,
  watchAuthenticateUserSaga,
  watchChangeUserRoleSaga,
  watchDeleteUserSaga,
  watchLogoutSaga,
  watchRegisterUserSaga,
  watchUpdateUserInfoSaga
} from 'src/store/user/userSaga';
import {
  watchAddNewTimezoneEntrySaga,
  watchDeleteTimezoneEntrySaga,
  watchFetchTimezoneEntriesSaga,
  watchUpdateTimezoneEntrySaga
} from 'src/store/timezone/timezoneSaga';
import {
  watchAllSearchTimezoneEntriesSaga,
  watchSearchTimezoneEntriesSaga,
  watchSearchUsersSaga
} from 'src/store/search/searchSaga';
/* eslint-disable max-len*/
// prettier-ignore
export default function* rootSaga() {
    yield all([
        watchAuthenticateUserSaga(), watchRegisterUserSaga(), watchLogoutSaga(), watchChangeUserRoleSaga(), watchAuthAutoSignInSaga(), watchDeleteUserSaga(), watchUpdateUserInfoSaga(),
        watchAddNewTimezoneEntrySaga(), watchFetchTimezoneEntriesSaga(), watchDeleteTimezoneEntrySaga(), watchUpdateTimezoneEntrySaga(),
        watchSearchTimezoneEntriesSaga(), watchAllSearchTimezoneEntriesSaga(), watchSearchUsersSaga()
    ]);
}

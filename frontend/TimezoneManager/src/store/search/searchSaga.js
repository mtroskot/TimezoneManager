import { delay, put, select, takeLeading } from '@redux-saga/core/effects';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { refreshActionStop, startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { DEFAULT_ERROR, NO_RESULTS } from 'src/constants/messages';
import { searchTimezoneEntriesSuccess, searchUsersSuccess } from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';
import { userInfoSelector } from 'src/store/user/userSelectors';

export function* searchTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput } = payload;
    yield put(startAction(type));
    yield delay(1000);
    const timezoneEntries = yield select(timezoneEntriesSelector);
    const matchingTimezoneEntries = timezoneEntries.filter(
      entry =>
        entry.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        entry.cityName.toLowerCase().includes(searchInput.toLowerCase())
    );
    const searchData = {
      searchResults: matchingTimezoneEntries,
      message: matchingTimezoneEntries.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchTimezoneEntriesSuccess(searchData));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('searchTimezoneEntriesSaga error', error);
  } finally {
    yield put(payload.refreshing ? refreshActionStop(type) : stopAction(type));
  }
}

export function* watchSearchTimezoneEntriesSaga() {
  yield takeLeading(searchActionTypes.SEARCH_TIMEZONE_ENTRIES, searchTimezoneEntriesSaga);
}

export function* searchUsersSaga({ type, payload }) {
  try {
    const userInfo = yield select(userInfoSelector);
    const { searchInput } = payload;
    yield put(startAction(type));
    yield delay(1000);
    const matchingUsers = [];
    if (
      [userInfo.firstName, userInfo.lastName, userInfo.emailAddress].some(str =>
        str.includes(searchInput.toLowerCase())
      )
    ) {
      matchingUsers.push(userInfo);
    }
    const searchData = {
      searchResults: matchingUsers,
      message: matchingUsers.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchUsersSuccess(searchData));
  } catch (error) {
    yield put(togglePopupMessage(DEFAULT_ERROR, 'top'));
    console.log('searchUsersSaga error', error);
  } finally {
    yield put(payload.refreshing ? refreshActionStop(type) : stopAction(type));
  }
}

export function* watchSearchUsersSaga() {
  yield takeLeading(searchActionTypes.SEARCH_USERS, searchUsersSaga);
}

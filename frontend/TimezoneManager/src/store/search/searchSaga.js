import { delay, put, select, takeLeading } from '@redux-saga/core/effects';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { refreshActionStop, startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { DEFAULT_ERROR, NO_RESULTS } from 'src/constants/messages';
import {
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchTimezoneEntriesSuccess,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';
import { userInfoSelector } from 'src/store/user/userSelectors';
import { timezoneEntriesSearchDataSelector, userSearchDataSelector } from 'src/store/search/searchSelectors';

export function* searchTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput } = payload;
    const timezoneEntriesSearchData = yield select(timezoneEntriesSearchDataSelector);
    if (timezoneEntriesSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearTimezoneEntriesSearch());
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
      searchQuery: searchInput,
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
    const userSearchData = yield select(userSearchDataSelector);
    const { searchInput } = payload;
    if (userSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearUsersSearch());
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
      searchQuery: searchInput,
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

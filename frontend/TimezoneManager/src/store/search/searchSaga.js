import { call, delay, put, select, takeLeading } from '@redux-saga/core/effects';
import { refreshActionStop, startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { DEFAULT_ERROR, NO_RESULTS } from 'src/constants/messages';
import {
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchTimezoneEntriesSuccess,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';
import { timezoneEntriesSearchDataSelector, userSearchDataSelector } from 'src/store/search/searchSelectors';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import { ParseUtils } from 'src/utils';

export function* searchTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput, cancelToken, fromAllUsers } = payload;
    const timezoneEntriesSearchData = yield select(timezoneEntriesSearchDataSelector);
    if (timezoneEntriesSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearTimezoneEntriesSearch());
    yield put(startAction(type));
    yield delay(1000);
    const response = yield call(
      ApiService.callApi,
      fromAllUsers
        ? timezoneRequests.filterAllTimezoneEntries(searchInput, cancelToken)
        : timezoneRequests.filterUserTimezoneEntries(searchInput, cancelToken)
    );
    const matchingTimezoneEntries = response.data;
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
    const userSearchData = yield select(userSearchDataSelector);
    const { searchInput, cancelToken } = payload;
    if (userSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearUsersSearch());
    yield put(startAction(type));
    // yield delay(1000);
    const response = yield call(ApiService.callApi, userRequests.filterUsers(searchInput, cancelToken));
    const matchingUsers = response.data.map(user => ({ ...user, roles: ParseUtils.parseRoles(user.roles) }));
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

import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction } from 'src/store/ui/uiActions';
import { NO_RESULTS } from 'src/constants/messages';
import {
  clearAllTimezoneEntriesSearch,
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchAllTimezoneEntriesSuccess,
  searchTimezoneEntriesSuccess,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';
import {
  allTimezoneEntriesSearchDataSelector,
  timezoneEntriesSearchDataSelector,
  userSearchDataSelector
} from 'src/store/search/searchSelectors';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import { AppUtils, ParseUtils } from 'src/utils';

export function* searchTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput, cancelToken } = payload;
    const timezoneEntriesSearchData = yield select(timezoneEntriesSearchDataSelector);
    if (timezoneEntriesSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearTimezoneEntriesSearch());
    yield put(startAction(type));
    const response = yield call(
      ApiService.callApi,
      timezoneRequests.filterUserTimezoneEntries(searchInput, cancelToken)
    );
    const matchingTimezoneEntries = response.data;
    const searchData = {
      searchResults: matchingTimezoneEntries,
      searchQuery: searchInput,
      message: matchingTimezoneEntries.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchTimezoneEntriesSuccess(searchData));
  } catch (error) {
    console.log('searchTimezoneEntriesSaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchSearchTimezoneEntriesSaga() {
  yield takeLeading(searchActionTypes.SEARCH_TIMEZONE_ENTRIES, searchTimezoneEntriesSaga);
}

export function* searchAllTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput, cancelToken } = payload;
    const allTimezoneEntriesSearchData = yield select(allTimezoneEntriesSearchDataSelector);
    if (allTimezoneEntriesSearchData.searchQuery === searchInput) {
      return;
    }
    yield put(clearAllTimezoneEntriesSearch());
    yield put(startAction(type));
    const response = yield call(
      ApiService.callApi,
      timezoneRequests.filterAllTimezoneEntries(searchInput, cancelToken)
    );
    const matchingTimezoneEntries = response.data;
    const searchData = {
      searchResults: matchingTimezoneEntries,
      searchQuery: searchInput,
      message: matchingTimezoneEntries.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchAllTimezoneEntriesSuccess(searchData));
  } catch (error) {
    console.log('searchAllTimezoneEntriesSaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchAllSearchTimezoneEntriesSaga() {
  yield takeLeading(searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES, searchAllTimezoneEntriesSaga);
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
    const response = yield call(ApiService.callApi, userRequests.filterUsers(searchInput, cancelToken));
    const matchingUsers = response.data.map(user => ({ ...user, roles: ParseUtils.parseRoles(user.roles) }));
    const searchData = {
      searchResults: matchingUsers,
      searchQuery: searchInput,
      message: matchingUsers.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchUsersSuccess(searchData));
  } catch (error) {
    console.log('searchUsersSaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchSearchUsersSaga() {
  yield takeLeading(searchActionTypes.SEARCH_USERS, searchUsersSaga);
}

import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction } from 'src/store/ui/uiActions';
import { NO_RESULTS } from 'src/constants/messages';
import {
  clearAllTimezoneEntriesSearch,
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchAllTimezoneEntriesSuccess,
  searchUserTimezoneEntriesSuccess,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';
import {
  allTimezoneEntriesSearchDataSelector,
  filterOptionsSelector,
  timezoneEntriesSearchDataSelector,
  userSearchDataSelector
} from 'src/store/search/searchSelectors';
import { userInfoSelector } from 'src/store/user/userSelectors';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import { dropdowns, filters } from 'src/constants/search';
import { AppUtils, ParseUtils } from 'src/utils';

export function* searchUserTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput, filtersChanged, cancelToken } = payload;
    const timezoneEntriesSearchData = yield select(timezoneEntriesSearchDataSelector);
    if (timezoneEntriesSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearTimezoneEntriesSearch());
    yield put(startAction(type));
    const user = yield select(userInfoSelector);
    const ownEntriesFilterOptions = yield select(state => filterOptionsSelector(state, dropdowns.OWN_ENTRIES));
    // prettier-ignore
    /* eslint-disable max-len */
    const cityName = ownEntriesFilterOptions.some(filter => filter.value === filters.CITY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const name = ownEntriesFilterOptions.some(filter => filter.value === filters.ENTRY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const gmt = ownEntriesFilterOptions.some(filter => filter.value === filters.GMT && filter.selected === true) ? searchInput.replace('+','%2B') : null;
    /* eslint-enable max-len */
    const response = yield call(
      ApiService.callApi,
      userRequests.filterUserTimezoneEntries(user.id, cityName, name, gmt, cancelToken)
    );
    const matchingTimezoneEntries = response.data;
    const searchData = {
      searchResults: matchingTimezoneEntries,
      searchQuery: searchInput,
      message: matchingTimezoneEntries.length > 0 ? '' : NO_RESULTS
    };
    yield put(searchUserTimezoneEntriesSuccess(searchData));
  } catch (error) {
    console.log('searchTimezoneEntriesSaga error', error);
    yield call(AppUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(type));
  }
}

export function* watchSearchUserTimezoneEntriesSaga() {
  yield takeLeading(searchActionTypes.SEARCH_TIMEZONE_ENTRIES, searchUserTimezoneEntriesSaga);
}

export function* searchAllTimezoneEntriesSaga({ type, payload }) {
  try {
    const { searchInput, filtersChanged, cancelToken } = payload;
    const allTimezoneEntriesSearchData = yield select(allTimezoneEntriesSearchDataSelector);
    if (allTimezoneEntriesSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearAllTimezoneEntriesSearch());
    yield put(startAction(type));
    const allEntriesFilterOptions = yield select(state => filterOptionsSelector(state, dropdowns.ALL_ENTRIES));
    // prettier-ignore
    /* eslint-disable max-len */
    const cityName = allEntriesFilterOptions.some(filter => filter.value === filters.CITY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const name = allEntriesFilterOptions.some(filter => filter.value === filters.ENTRY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const gmt = allEntriesFilterOptions.some(filter => filter.value === filters.GMT && filter.selected === true) ? searchInput : null;
    /* eslint-enable max-len */
    const response = yield call(
      ApiService.callApi,
      timezoneRequests.filterTimezoneEntries(cityName, name, gmt, cancelToken)
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

export function* watchSearchAllTimezoneEntriesSaga() {
  yield takeLeading(searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES, searchAllTimezoneEntriesSaga);
}

export function* searchUsersSaga({ type, payload }) {
  try {
    const userSearchData = yield select(userSearchDataSelector);
    const { searchInput, filtersChanged, cancelToken } = payload;
    if (userSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearUsersSearch());
    yield put(startAction(type));
    const userFilterOptions = yield select(state => filterOptionsSelector(state, dropdowns.USERS));
    // prettier-ignore
    /* eslint-disable max-len */
    const firstName = userFilterOptions.some(filter => filter.value === filters.FIRST_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const lastName = userFilterOptions.some(filter => filter.value === filters.LAST_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const emailAddress = userFilterOptions.some(filter => filter.value === filters.EMAIL_ADDRESS && filter.selected === true) ? searchInput : null;
    /* eslint-enable max-len */
    const response = yield call(
      ApiService.callApi,
      userRequests.filterUsers(firstName, lastName, emailAddress, cancelToken)
    );
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

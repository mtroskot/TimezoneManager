import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction } from 'src/store/ui/uiActions';
import {
  clearAllTimezoneEntriesSearch,
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchAllTimezoneEntriesSuccess,
  searchUserTimezoneEntriesSuccess,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import {
  allTimezoneEntriesSearchDataSelector,
  filterOptionsSelector,
  timezoneEntriesSearchDataSelector,
  userSearchDataSelector
} from 'src/store/search/searchSelectors';
import { userInfoSelector } from 'src/store/user/userSelectors';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import { ParseUtils, ValidationUtils } from 'src/utils/index';
import { SearchAllTimezoneEntries, SearchUsers, SearchUserTimezoneEntries } from 'src/types/store/searchActions';
import { SearchActionTypes } from 'src/types/store/actionTypes';
import { eDropdowns, eFilters, eMessages } from 'src/types/enums';
import { iFilterOption, iUser } from 'src/types/interfaces';
import { tObject } from 'src/types/types';

export function* searchUserTimezoneEntriesSaga(action: SearchUserTimezoneEntries) {
  try {
    const { searchInput, filtersChanged, cancelToken } = action.payload;
    const timezoneEntriesSearchData = yield select(timezoneEntriesSearchDataSelector);
    if (timezoneEntriesSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearTimezoneEntriesSearch());
    yield put(startAction(action.type));
    const user = yield select(userInfoSelector);
    const ownEntriesFilterOptions = yield select((state) => filterOptionsSelector(state, eDropdowns.OWN_ENTRIES));
    // prettier-ignore
    /* eslint-disable max-len */
    const cityName = ownEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.CITY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const name = ownEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.ENTRY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const gmt = ownEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.GMT && filter.selected === true) ? searchInput.replace('+', '%2B') : null;
    /* eslint-enable max-len */
    const response = yield call(ApiService.callApi, userRequests.filterUserTimezoneEntries(user.id, cityName, name, gmt, cancelToken));
    const matchingTimezoneEntries = response.data;
    const searchData = {
      searchResults: matchingTimezoneEntries,
      searchQuery: searchInput,
      message: matchingTimezoneEntries.length > 0 ? '' : eMessages.NO_RESULTS
    };
    yield put(searchUserTimezoneEntriesSuccess(searchData));
  } catch (error) {
    console.log('searchTimezoneEntriesSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchSearchUserTimezoneEntriesSaga() {
  yield takeLeading(SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES, searchUserTimezoneEntriesSaga);
}

export function* searchAllTimezoneEntriesSaga(action: SearchAllTimezoneEntries) {
  try {
    const { searchInput, filtersChanged, cancelToken } = action.payload;
    const allTimezoneEntriesSearchData = yield select(allTimezoneEntriesSearchDataSelector);
    if (allTimezoneEntriesSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearAllTimezoneEntriesSearch());
    yield put(startAction(action.type));
    const allEntriesFilterOptions = yield select((state) => filterOptionsSelector(state, eDropdowns.ALL_ENTRIES));
    // prettier-ignore
    /* eslint-disable max-len */
    const cityName = allEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.CITY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const name = allEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.ENTRY_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const gmt = allEntriesFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.GMT && filter.selected === true) ? searchInput : null;
    /* eslint-enable max-len */
    const response = yield call(ApiService.callApi, timezoneRequests.filterTimezoneEntries(cityName, name, gmt, cancelToken));
    const matchingTimezoneEntries = response.data;
    const searchData = {
      searchResults: matchingTimezoneEntries,
      searchQuery: searchInput,
      message: matchingTimezoneEntries.length > 0 ? '' : eMessages.NO_RESULTS
    };
    yield put(searchAllTimezoneEntriesSuccess(searchData));
  } catch (error) {
    console.log('searchAllTimezoneEntriesSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchSearchAllTimezoneEntriesSaga() {
  yield takeLeading(SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES, searchAllTimezoneEntriesSaga);
}

export function* searchUsersSaga(action: SearchUsers) {
  try {
    const userSearchData = yield select(userSearchDataSelector);
    const { searchInput, filtersChanged, cancelToken } = action.payload;
    if (userSearchData.searchQuery === searchInput && !filtersChanged) {
      return;
    }
    yield put(clearUsersSearch());
    yield put(startAction(action.type));
    const userFilterOptions = yield select((state) => filterOptionsSelector(state, eDropdowns.USERS));
    // prettier-ignore
    /* eslint-disable max-len */
    const firstName = userFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.FIRST_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const lastName = userFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.LAST_NAME && filter.selected === true) ? searchInput : null;
    // prettier-ignore
    const emailAddress = userFilterOptions.some((filter: iFilterOption) => filter.value === eFilters.EMAIL_ADDRESS && filter.selected === true) ? searchInput : null;
    /* eslint-enable max-len */
    const response = yield call(ApiService.callApi, userRequests.filterUsers(firstName, lastName, emailAddress, cancelToken));
    const matchingUsers: iUser[] = response.data.map((user: tObject) => ({
      ...user,
      roles: ParseUtils.parseRoles(user.roles)
    }));
    const searchData = {
      searchResults: matchingUsers,
      searchQuery: searchInput,
      message: matchingUsers.length > 0 ? '' : eMessages.NO_RESULTS
    };
    yield put(searchUsersSuccess(searchData));
  } catch (error) {
    console.log('searchUsersSaga error', error);
    yield call(ValidationUtils.handleErrorMessage, error);
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchSearchUsersSaga() {
  yield takeLeading(SearchActionTypes.SEARCH_USERS, searchUsersSaga);
}

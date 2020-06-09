import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction } from 'src/store/ui/uiActions';
import { NO_RESULTS } from 'src/constants/messages';
import {
  clearAllTimezoneEntriesSearch,
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchAllTimezoneEntries,
  searchAllTimezoneEntriesSuccess,
  searchUserTimezoneEntries,
  searchUserTimezoneEntriesSuccess,
  searchUsers,
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
import {
  searchAllTimezoneEntriesSaga,
  searchUserTimezoneEntriesSaga,
  searchUsersSaga,
  watchSearchAllTimezoneEntriesSaga,
  watchSearchUserTimezoneEntriesSaga,
  watchSearchUsersSaga
} from 'src/store/search/searchSaga';
import { searchActionTypes } from '../../../src/types/store/actionTypes';
import { dropdowns, filters } from 'src/constants/search';
import { MANAGER, USER } from 'src/constants/userRoles';
import { AppUtils } from 'src/utils';

jest.mock('src/store', () => {
  return {};
});

describe('searchUserTimezoneEntriesSaga test', () => {
  it('should successfully fetch user timezoneEntries, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUserTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchUserTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(timezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'a' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(clearTimezoneEntriesSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(gen.next().value).toEqual(select(userInfoSelector));
    const userInfo = { id: 5 };
    expect(JSON.stringify(gen.next(userInfo).value)).toEqual(
      JSON.stringify(select(state => filterOptionsSelector(state, dropdowns.OWN_ENTRIES)))
    );
    const ownEntriesFilterOptions = [
      { value: filters.CITY_NAME, selected: true },
      { value: filters.ENTRY_NAME, selected: false },
      { value: filters.GMT, selected: false }
    ];
    const cityName = searchInput;
    const name = null;
    const gmt = null;

    expect(gen.next(ownEntriesFilterOptions).value).toEqual(
      call(ApiService.callApi, userRequests.filterUserTimezoneEntries(userInfo.id, cityName, name, gmt, cancelToken))
    );
    const response = { data: [] };
    const searchData = {
      searchResults: response.data,
      searchQuery: searchInput,
      message: NO_RESULTS
    };
    expect(gen.next(response).value).toEqual(put(searchUserTimezoneEntriesSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should not start search because searchQuery === searchInput && filtersChanged=false', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUserTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchUserTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(timezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'abc' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUserTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchUserTimezoneEntriesSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(call(AppUtils.handleErrorMessage, error));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchSearchUserTimezoneEntriesSaga test', () => {
  const gen = watchSearchUserTimezoneEntriesSaga();
  // exactly the same as implementation
  const expected = takeLeading(searchActionTypes.SEARCH_TIMEZONE_ENTRIES, searchUserTimezoneEntriesSaga);
  const actual = gen.next().value;

  it('Should fire on SEARCH_TIMEZONE_ENTRIES', () => {
    expect(actual).toEqual(expected);
  });
});

describe('searchAllTimezoneEntriesSaga test', () => {
  it('should successfully fetch all timezoneEntries, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchAllTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchAllTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(allTimezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'a' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(clearAllTimezoneEntriesSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(select(state => filterOptionsSelector(state, dropdowns.ALL_ENTRIES)))
    );
    const allEntriesFilterOptions = [
      { value: filters.CITY_NAME, selected: true },
      { value: filters.ENTRY_NAME, selected: false },
      { value: filters.GMT, selected: false }
    ];
    const cityName = searchInput;
    const name = null;
    const gmt = null;

    expect(gen.next(allEntriesFilterOptions).value).toEqual(
      call(ApiService.callApi, timezoneRequests.filterTimezoneEntries(cityName, name, gmt, cancelToken))
    );
    const response = { data: [{ id: 1 }, { id: 2 }] };
    const searchData = {
      searchResults: response.data,
      searchQuery: searchInput,
      message: ''
    };
    expect(gen.next(response).value).toEqual(put(searchAllTimezoneEntriesSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should not start search because searchQuery === searchInput & filtersChanged=false', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchAllTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchAllTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(allTimezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'abc' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchAllTimezoneEntries(searchInput, filtersChanged, cancelToken);

    const gen = searchAllTimezoneEntriesSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(call(AppUtils.handleErrorMessage, error));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchSearchAllTimezoneEntriesSaga test', () => {
  const gen = watchSearchAllTimezoneEntriesSaga();
  // exactly the same as implementation
  const expected = takeLeading(searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES, searchAllTimezoneEntriesSaga);
  const actual = gen.next().value;

  it('Should fire on SEARCH_TIMEZONE_ENTRIES', () => {
    expect(actual).toEqual(expected);
  });
});

describe('searchUsersSaga test', () => {
  it('should successfully fetch users, no results, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUsers(searchInput, filtersChanged, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'a' };
    expect(gen.next(userSearchData).value).toEqual(put(clearUsersSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(select(state => filterOptionsSelector(state, dropdowns.USERS)))
    );
    const userFilterOptions = [
      { value: filters.FIRST_NAME, selected: true },
      { value: filters.LAST_NAME, selected: false },
      { value: filters.EMAIL_ADDRESS, selected: true }
    ];
    const firstName = searchInput;
    const lastName = null;
    const emailAddress = searchInput;

    expect(gen.next(userFilterOptions).value).toEqual(
      call(ApiService.callApi, userRequests.filterUsers(firstName, lastName, emailAddress, cancelToken))
    );
    const response = { data: [] };
    const searchData = {
      searchResults: response.data,
      searchQuery: searchInput,
      message: NO_RESULTS
    };
    expect(gen.next(response).value).toEqual(put(searchUsersSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should successfully fetch users,results found, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUsers(searchInput, filtersChanged, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'a' };
    expect(gen.next(userSearchData).value).toEqual(put(clearUsersSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(select(state => filterOptionsSelector(state, dropdowns.USERS)))
    );
    const userFilterOptions = [
      { value: filters.FIRST_NAME, selected: true },
      { value: filters.LAST_NAME, selected: false },
      { value: filters.EMAIL_ADDRESS, selected: true }
    ];
    const firstName = searchInput;
    const lastName = null;
    const emailAddress = searchInput;
    expect(gen.next(userFilterOptions).value).toEqual(
      call(ApiService.callApi, userRequests.filterUsers(firstName, lastName, emailAddress, cancelToken))
    );
    const response = {
      data: [{ id: 1, roles: [{ type: USER }] }, { id: 2, roles: [{ type: USER }, { type: MANAGER }] }]
    };
    const searchData = {
      searchResults: [{ id: 1, roles: [USER] }, { id: 2, roles: [USER, MANAGER] }],
      searchQuery: searchInput,
      message: ''
    };
    expect(gen.next(response).value).toEqual(put(searchUsersSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should not start search because  searchQuery === searchInput & filtersChanged=false', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUsers(searchInput, filtersChanged, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'abc' };
    expect(gen.next(userSearchData).value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs, in app error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUsers(searchInput, filtersChanged, cancelToken);

    const gen = searchUsersSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(call(AppUtils.handleErrorMessage, error));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs, network error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const filtersChanged = false;
    const action = searchUsers(searchInput, filtersChanged, cancelToken);

    const gen = searchUsersSaga(action);
    gen.next();
    const error = new Error('Network');
    expect(gen.throw(error).value).toEqual(call(AppUtils.handleErrorMessage, error));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchSearchUsersSaga test', () => {
  const gen = watchSearchUsersSaga();
  // exactly the same as implementation
  const expected = takeLeading(searchActionTypes.SEARCH_USERS, searchUsersSaga);
  const actual = gen.next().value;

  it('Should fire on SEARCH_USERS', () => {
    expect(actual).toEqual(expected);
  });
});

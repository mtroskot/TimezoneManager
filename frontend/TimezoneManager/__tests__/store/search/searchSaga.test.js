import { call, put, select, takeLeading } from '@redux-saga/core/effects';
import { startAction, stopAction, togglePopupMessage } from 'src/store/ui/uiActions';
import { DEFAULT_ERROR, NO_INTERNET, NO_RESULTS } from 'src/constants/messages';
import {
  clearTimezoneEntriesSearch,
  clearUsersSearch,
  searchTimezoneEntries,
  searchTimezoneEntriesSuccess,
  searchUsers,
  searchUsersSuccess
} from 'src/store/search/searchActions';
import { timezoneEntriesSearchDataSelector, userSearchDataSelector } from 'src/store/search/searchSelectors';
import ApiService, { timezoneRequests, userRequests } from 'src/services/api';
import {
  searchTimezoneEntriesSaga,
  searchUsersSaga,
  watchSearchTimezoneEntriesSaga,
  watchSearchUsersSaga
} from 'src/store/search/searchSaga';
import { searchActionTypes } from 'src/constants/actionTypes';
import { MANAGER, USER } from 'src/constants/userRoles';

jest.mock('src/store', () => {
  return {};
});

describe('searchTimezoneEntriesSaga test', () => {
  it('should successfully fetch only user timezoneEntries, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const fromAllUsers = false;
    const action = searchTimezoneEntries(searchInput, cancelToken, fromAllUsers);

    const gen = searchTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(timezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'a' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(clearTimezoneEntriesSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));

    expect(gen.next().value).toEqual(
      call(ApiService.callApi, timezoneRequests.filterUserTimezoneEntries(searchInput, cancelToken))
    );
    const response = { data: [] };
    const searchData = {
      searchResults: response.data,
      searchQuery: searchInput,
      message: NO_RESULTS
    };
    expect(gen.next(response).value).toEqual(put(searchTimezoneEntriesSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should successfully fetch all timezoneEntries, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const fromAllUsers = true;
    const action = searchTimezoneEntries(searchInput, cancelToken, fromAllUsers);

    const gen = searchTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(timezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'a' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(clearTimezoneEntriesSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));

    expect(gen.next().value).toEqual(
      call(ApiService.callApi, timezoneRequests.filterAllTimezoneEntries(searchInput, cancelToken))
    );
    const response = { data: [{ id: 1 }, { id: 2 }] };
    const searchData = {
      searchResults: response.data,
      searchQuery: searchInput,
      message: ''
    };
    expect(gen.next(response).value).toEqual(put(searchTimezoneEntriesSuccess(searchData)));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should not start search because  searchQuery === searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const fromAllUsers = true;
    const action = searchTimezoneEntries(searchInput, cancelToken, fromAllUsers);

    const gen = searchTimezoneEntriesSaga(action);
    expect(gen.next().value).toEqual(select(timezoneEntriesSearchDataSelector));
    const timezoneEntriesSearchData = { searchQuery: 'abc' };
    expect(gen.next(timezoneEntriesSearchData).value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs,in app error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const fromAllUsers = true;
    const action = searchTimezoneEntries(searchInput, cancelToken, fromAllUsers);

    const gen = searchTimezoneEntriesSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(DEFAULT_ERROR, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs, network error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const fromAllUsers = true;
    const action = searchTimezoneEntries(searchInput, cancelToken, fromAllUsers);

    const gen = searchTimezoneEntriesSaga(action);
    gen.next();
    const error = new Error('Network');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(NO_INTERNET, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });
});

describe('watchSearchTimezoneEntriesSaga test', () => {
  const gen = watchSearchTimezoneEntriesSaga();
  // exactly the same as implementation
  const expected = takeLeading(searchActionTypes.SEARCH_TIMEZONE_ENTRIES, searchTimezoneEntriesSaga);
  const actual = gen.next().value;

  it('Should fire on SEARCH_TIMEZONE_ENTRIES', () => {
    expect(actual).toEqual(expected);
  });
});

describe('searchUsersSaga test', () => {
  it('should successfully fetch users, no results, searchQuery !== searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const action = searchUsers(searchInput, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'a' };
    expect(gen.next(userSearchData).value).toEqual(put(clearUsersSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));

    expect(gen.next().value).toEqual(call(ApiService.callApi, userRequests.filterUsers(searchInput, cancelToken)));
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
    const action = searchUsers(searchInput, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'a' };
    expect(gen.next(userSearchData).value).toEqual(put(clearUsersSearch()));
    expect(gen.next().value).toEqual(put(startAction(action.type)));

    expect(gen.next().value).toEqual(call(ApiService.callApi, userRequests.filterUsers(searchInput, cancelToken)));
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

  it('should not start search because  searchQuery === searchInput', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const action = searchUsers(searchInput, cancelToken);

    const gen = searchUsersSaga(action);
    expect(gen.next().value).toEqual(select(userSearchDataSelector));
    const userSearchData = { searchQuery: 'abc' };
    expect(gen.next(userSearchData).value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs, in app error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const action = searchUsers(searchInput, cancelToken);

    const gen = searchUsersSaga(action);
    gen.next();
    const error = new Error('msg');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(DEFAULT_ERROR, 'top')));
    expect(gen.next().value).toEqual(put(stopAction(action.type)));
    expect(gen.next().done).toBe(true);
  });

  it('should catch error if occurs, network error', () => {
    const searchInput = 'abc';
    const cancelToken = 'token';
    const action = searchUsers(searchInput, cancelToken);

    const gen = searchUsersSaga(action);
    gen.next();
    const error = new Error('Network');
    expect(gen.throw(error).value).toEqual(put(togglePopupMessage(NO_INTERNET, 'top')));
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

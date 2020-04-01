import configureStore from 'redux-mock-store';
import * as searchActions from 'src/store/search/searchActions';
import { searchActionTypes } from 'src/constants/actionTypes';

const middlewares = [];
const mockStore = configureStore(middlewares);
// Initialize mockstore with empty state
const initialState = {};
const store = mockStore(initialState);

describe('Search actions tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches searchTimezoneEntries action', () => {
    const searchInput = 'searchInput';
    const cancelToken = 'cancelToken';
    const fromAllUsers = 'fromAllUsers';
    const expectedActions = [
      {
        type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
        payload: { searchInput, cancelToken, fromAllUsers }
      }
    ];
    store.dispatch(searchActions.searchTimezoneEntries(searchInput, cancelToken, fromAllUsers));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches searchTimezoneEntriesSuccess action', () => {
    const searchData = 'searchData';
    const expectedActions = [
      {
        type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES_SUCCESS,
        payload: { searchData }
      }
    ];
    store.dispatch(searchActions.searchTimezoneEntriesSuccess(searchData));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches searchUsers action', () => {
    const searchInput = 'searchInput';
    const cancelToken = 'cancelToken';
    const expectedActions = [
      {
        type: searchActionTypes.SEARCH_USERS,
        payload: { searchInput, cancelToken }
      }
    ];
    store.dispatch(searchActions.searchUsers(searchInput, cancelToken));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches searchUsersSuccess action', () => {
    const searchData = 'searchData';
    const expectedActions = [
      {
        type: searchActionTypes.SEARCH_USERS_SUCCESS,
        payload: { searchData }
      }
    ];
    store.dispatch(searchActions.searchUsersSuccess(searchData));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches updateSearchedUserInfoSuccess action', () => {
    const updatedUserInfo = 'updatedUserInfo';
    const expectedActions = [
      {
        type: searchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS,
        payload: { updatedUserInfo }
      }
    ];
    store.dispatch(searchActions.updateSearchedUserInfoSuccess(updatedUserInfo));
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches clearAllSearches action', () => {
    const expectedActions = [
      {
        type: searchActionTypes.CLEAR_ALL_SEARCHES,
        payload: {}
      }
    ];
    store.dispatch(searchActions.clearAllSearches());
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches clearTimezoneEntriesSearch action', () => {
    const expectedActions = [
      {
        type: searchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH,
        payload: {}
      }
    ];
    store.dispatch(searchActions.clearTimezoneEntriesSearch());
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches clearUsersSearch action', () => {
    const expectedActions = [
      {
        type: searchActionTypes.CLEAR_USERS_SEARCH,
        payload: {}
      }
    ];
    store.dispatch(searchActions.clearUsersSearch());
    expect(store.getActions()).toEqual(expectedActions);
    expect(store.getActions()).toMatchSnapshot();
  });
});

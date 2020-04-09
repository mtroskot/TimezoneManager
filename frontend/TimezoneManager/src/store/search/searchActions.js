import { searchActionTypes } from 'src/constants/actionTypes';
//SEARCH DATA ACTIONS
export const searchUserTimezoneEntries = (searchInput, filtersChanged, cancelToken) => ({
  type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchUserTimezoneEntriesSuccess = searchData => ({
  type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES_SUCCESS,
  payload: { searchData }
});

export const searchAllTimezoneEntries = (searchInput, filtersChanged, cancelToken) => ({
  type: searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchAllTimezoneEntriesSuccess = searchData => ({
  type: searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES_SUCCESS,
  payload: { searchData }
});

export const searchUsers = (searchInput, filtersChanged, cancelToken) => ({
  type: searchActionTypes.SEARCH_USERS,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchUsersSuccess = searchData => ({
  type: searchActionTypes.SEARCH_USERS_SUCCESS,
  payload: { searchData }
});

export const updateSearchedUserInfoSuccess = updatedUserInfo => ({
  type: searchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS,
  payload: { updatedUserInfo }
});

export const clearAllSearches = () => ({
  type: searchActionTypes.CLEAR_ALL_SEARCHES,
  payload: {}
});

export const clearTimezoneEntriesSearch = () => ({
  type: searchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH,
  payload: {}
});

export const clearAllTimezoneEntriesSearch = () => ({
  type: searchActionTypes.CLEAR_ALL_TIMEZONE_ENTRIES_SEARCH,
  payload: {}
});

export const clearUsersSearch = () => ({
  type: searchActionTypes.CLEAR_USERS_SEARCH,
  payload: {}
});

//SEARCH OPTIONS ACTIONS
export const changeSelectedDropdown = selectedDropdown => ({
  type: searchActionTypes.CHANGE_SELECTED_DROPDOWN,
  payload: { selectedDropdown }
});

export const changeSelectedFilter = (newFilterOptions, selectedSearchOption) => ({
  type: searchActionTypes.CHANGE_SELECTED_FILTER,
  payload: { newFilterOptions, selectedSearchOption }
});

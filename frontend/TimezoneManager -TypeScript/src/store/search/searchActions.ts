import { SearchActionTypes } from 'src/types/store/actionTypes';
import { SearchActions } from 'src/types/store/searchActions';
import { CancelToken } from 'axios';
import { iDropdownOption, iFilterOption, iSavedTimezoneEntry, iSearchData, iUser } from 'src/types/interfaces';
import { eDropdowns } from 'src/types/enums';

//SEARCH DATA ACTIONS
export const searchUserTimezoneEntries = (searchInput: string, filtersChanged: boolean, cancelToken: CancelToken): SearchActions => ({
  type: SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchUserTimezoneEntriesSuccess = (searchData: iSearchData<iSavedTimezoneEntry>): SearchActions => ({
  type: SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES_SUCCESS,
  payload: { searchData }
});

export const searchAllTimezoneEntries = (searchInput: string, filtersChanged: boolean, cancelToken: CancelToken): SearchActions => ({
  type: SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchAllTimezoneEntriesSuccess = (searchData: iSearchData<iSavedTimezoneEntry>): SearchActions => ({
  type: SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES_SUCCESS,
  payload: { searchData }
});

export const searchUsers = (searchInput: string, filtersChanged: boolean, cancelToken: CancelToken): SearchActions => ({
  type: SearchActionTypes.SEARCH_USERS,
  payload: { searchInput, filtersChanged, cancelToken }
});

export const searchUsersSuccess = (searchData: iSearchData<iUser>): SearchActions => ({
  type: SearchActionTypes.SEARCH_USERS_SUCCESS,
  payload: { searchData }
});

export const updateSearchedUserInfoSuccess = (updatedUserInfo: iUser): SearchActions => ({
  type: SearchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS,
  payload: { updatedUserInfo }
});

export const clearAllSearches = (): SearchActions => ({
  type: SearchActionTypes.CLEAR_ALL_SEARCHES,
  payload: {}
});

export const clearTimezoneEntriesSearch = (): SearchActions => ({
  type: SearchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH,
  payload: {}
});

export const clearAllTimezoneEntriesSearch = (): SearchActions => ({
  type: SearchActionTypes.CLEAR_ALL_TIMEZONE_ENTRIES_SEARCH,
  payload: {}
});

export const clearUsersSearch = (): SearchActions => ({
  type: SearchActionTypes.CLEAR_USERS_SEARCH,
  payload: {}
});

//SEARCH OPTIONS ACTIONS
export const changeSelectedDropdown = (selectedDropdown: iDropdownOption): SearchActions => ({
  type: SearchActionTypes.CHANGE_SELECTED_DROPDOWN,
  payload: { selectedDropdown }
});

export const changeSelectedFilter = (newFilterOptions: iFilterOption[], selectedSearchOption: eDropdowns): SearchActions => ({
  type: SearchActionTypes.CHANGE_SELECTED_FILTER,
  payload: { newFilterOptions, selectedSearchOption }
});

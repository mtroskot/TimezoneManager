import { SearchActionTypes } from 'src/types/store/actionTypes';
import { CancelToken } from 'axios';
import { iDropdownOption, iFilterOption, iSavedTimezoneEntry, iSearchData, iUser } from 'src/types/interfaces';
import { eDropdowns } from 'src/types/enums';

export interface SearchUserTimezoneEntries {
  type: SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES;
  payload: { searchInput: string; filtersChanged: boolean; cancelToken: CancelToken };
}

interface SearchUserTimezoneEntriesSuccess {
  type: SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES_SUCCESS;
  payload: { searchData: iSearchData<iSavedTimezoneEntry> };
}

export interface SearchAllTimezoneEntries {
  type: SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES;
  payload: { searchInput: string; filtersChanged: boolean; cancelToken: CancelToken };
}

interface SearchAllTimezoneEntriesSuccess {
  type: SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES_SUCCESS;
  payload: { searchData: iSearchData<iSavedTimezoneEntry> };
}

export interface SearchUsers {
  type: SearchActionTypes.SEARCH_USERS;
  payload: { searchInput: string; filtersChanged: boolean; cancelToken: CancelToken };
}

interface SearchUsersSuccess {
  type: SearchActionTypes.SEARCH_USERS_SUCCESS;
  payload: { searchData: iSearchData<iUser> };
}

interface UpdateSearchedUserInfoSuccess {
  type: SearchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS;
  payload: { updatedUserInfo: iUser };
}

interface ClearAllSearches {
  type: SearchActionTypes.CLEAR_ALL_SEARCHES;
  payload: {};
}

interface ClearTimezoneEntriesSearch {
  type: SearchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH;
  payload: {};
}

interface ClearAllTimezoneEntriesSearch {
  type: SearchActionTypes.CLEAR_ALL_TIMEZONE_ENTRIES_SEARCH;
  payload: {};
}

interface ClearUsersSearch {
  type: SearchActionTypes.CLEAR_USERS_SEARCH;
  payload: {};
}

//SEARCH OPTIONS ACTIONS
interface ChangeSelectedDropdown {
  type: SearchActionTypes.CHANGE_SELECTED_DROPDOWN;
  payload: { selectedDropdown: iDropdownOption };
}

interface ChangeSelectedFilter {
  type: SearchActionTypes.CHANGE_SELECTED_FILTER;
  payload: { newFilterOptions: iFilterOption[]; selectedSearchOption: eDropdowns };
}

export type SearchActions =
  | SearchUserTimezoneEntries
  | SearchUserTimezoneEntriesSuccess
  | SearchAllTimezoneEntries
  | SearchAllTimezoneEntriesSuccess
  | SearchUsers
  | SearchUsersSuccess
  | UpdateSearchedUserInfoSuccess
  | UpdateSearchedUserInfoSuccess
  | ClearAllSearches
  | ClearTimezoneEntriesSearch
  | ClearAllTimezoneEntriesSearch
  | ClearUsersSearch
  | ChangeSelectedDropdown
  | ChangeSelectedFilter;

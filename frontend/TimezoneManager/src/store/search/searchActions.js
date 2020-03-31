import { searchActionTypes } from 'src/constants/actionTypes';

export function searchTimezoneEntries(searchInput, cancelToken, fromAllUsers) {
  return {
    type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
    payload: { searchInput, cancelToken, fromAllUsers }
  };
}

export const searchTimezoneEntriesSuccess = searchData => {
  return {
    type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES_SUCCESS,
    payload: { searchData }
  };
};

export function searchUsers(searchInput, cancelToken) {
  return {
    type: searchActionTypes.SEARCH_USERS,
    payload: { searchInput, cancelToken }
  };
}

export const searchUsersSuccess = searchData => {
  return {
    type: searchActionTypes.SEARCH_USERS_SUCCESS,
    payload: { searchData }
  };
};

export function updateSearchedUserInfoSuccess(updatedUserInfo) {
  return {
    type: searchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS,
    payload: { updatedUserInfo }
  };
}

export const clearAllSearches = () => {
  return {
    type: searchActionTypes.CLEAR_ALL_SEARCHES,
    payload: {}
  };
};
export const clearTimezoneEntriesSearch = () => {
  return {
    type: searchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH,
    payload: {}
  };
};
export const clearUsersSearch = () => {
  return {
    type: searchActionTypes.CLEAR_USERS_SEARCH,
    payload: {}
  };
};

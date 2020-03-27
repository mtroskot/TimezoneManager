import { searchActionTypes } from 'src/constants/actionTypes';

export function searchTimezoneEntries(searchInput, cancelToken) {
  return {
    type: searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
    payload: { searchInput, cancelToken }
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

export const clearSearch = () => {
  return {
    type: searchActionTypes.CLEAR_SEARCH,
    payload: {}
  };
};

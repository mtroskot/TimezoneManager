import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { ArrayUtils } from 'src/utils';
import { idNames } from 'src/constants/idKeyNames';

const initialState = {
  userSearchData: {
    searchResults: [],
    searchQuery: '',
    message: ''
  },
  timezoneEntriesSearchData: {
    searchResults: [],
    searchQuery: '',
    message: ''
  }
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchActionTypes.SEARCH_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: payload.searchData
      };
    case searchActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userSearchData: payload.searchData
      };
    case userActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userSearchData: {
          ...state.userSearchData,
          searchResults: ArrayUtils.updateItemInList(
            state.userSearchData.searchResults,
            idNames.USER_ID,
            payload.updatedUserInfo
          )
        }
      };
    case timezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          ...state.timezoneEntriesSearchData,
          searchResults: ArrayUtils.updateItemInList(
            state.timezoneEntriesSearchData.searchResults,
            idNames.TIMEZONE_ENTRY_ID,
            payload.timezoneEntry
          )
        }
      };
    case userActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        userSearchData: {
          ...state.userSearchData,
          searchResults: ArrayUtils.removeItemFromList(
            state.userSearchData.searchResults,
            idNames.USER_ID,
            payload.userId
          )
        }
      };
    case timezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          ...state.timezoneEntriesSearchData,
          searchResults: ArrayUtils.removeItemFromList(
            state.timezoneEntriesSearchData.searchResults,
            idNames.TIMEZONE_ENTRY_ID,
            payload.timezoneEntryId
          )
        }
      };
    case searchActionTypes.CLEAR_ALL_SEARCHES:
      return {
        ...state,
        userSearchData: initialState.userSearchData,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData
      };
    case searchActionTypes.CLEAR_USERS_SEARCH:
      return {
        ...state,
        userSearchData: initialState.userSearchData
      };
    case searchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH:
      return {
        ...state,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData
      };
    default:
      return state;
  }
};

export default searchReducer;

import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { ArrayUtils } from 'src/utils';
import { idNames } from 'src/constants/idKeyNames';

const initialState = {
  userSearchData: {
    searchResults: [],
    message: ''
  },
  timezoneEntriesSearchData: {
    searchResults: [],
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
        timezoneEntriesSearchData: {
          ...state.timezoneEntriesSearchData,
          searchResults: ArrayUtils.updateItemInList(
            state.timezoneEntriesSearchData.searchResults,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? idNames.USER_ID : idNames.TIMEZONE_ENTRY_ID,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? payload.updatedUserInfo : payload.timezoneEntry
          )
        }
      };
    case timezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        userSearchData: {
          ...state.userSearchData,
          searchResults: ArrayUtils.updateItemInList(
            state.userSearchData.searchResults,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? idNames.USER_ID : idNames.TIMEZONE_ENTRY_ID,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? payload.updatedUserInfo : payload.timezoneEntry
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
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? idNames.USER_ID : idNames.TIMEZONE_ENTRY_ID,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? payload.userId : payload.timezoneEntryId
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
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? idNames.USER_ID : idNames.TIMEZONE_ENTRY_ID,
            type === userActionTypes.UPDATE_USER_INFO_SUCCESS ? payload.userId : payload.timezoneEntryId
          )
        }
      };
    case searchActionTypes.CLEAR_SEARCH:
      return {
        ...state,
        userSearchData: initialState.userSearchData,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData
      };
    default:
      return state;
  }
};

export default searchReducer;

import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { ArrayUtils } from 'src/utils';
import { dropdownOptions, dropdowns, filters } from 'src/constants/search';
import { idNames } from 'src/constants/idKeyNames';

export const initialState = {
  userSearchData: {
    searchResults: [],
    searchQuery: '',
    message: ''
  },
  timezoneEntriesSearchData: {
    searchResults: [],
    searchQuery: '',
    message: ''
  },
  allTimezoneEntriesSearchData: {
    searchResults: [],
    searchQuery: '',
    message: ''
  },
  searchOptions: {
    selectedOption: dropdownOptions[0],
    filterOptions: {
      [dropdowns.OWN_ENTRIES]: [
        { value: filters.ENTRY_NAME, label: 'Name', selected: true },
        { value: filters.CITY_NAME, label: 'City name', selected: true },
        { value: filters.GMT, label: 'GMT', selected: true }
      ],
      [dropdowns.USERS]: [
        { value: filters.FIRST_NAME, label: 'First Name', selected: true },
        { value: filters.LAST_NAME, label: 'Last Name', selected: true },
        { value: filters.EMAIL_ADDRESS, label: 'Email Address', selected: true }
      ],
      [dropdowns.ALL_ENTRIES]: [
        { value: filters.ENTRY_NAME, label: 'Name', selected: true },
        { value: filters.CITY_NAME, label: 'City name', selected: true },
        { value: filters.GMT, label: 'GMT', selected: true }
      ]
    }
  }
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //SEARCH DATA STATE
    case searchActionTypes.SEARCH_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          searchResults: payload.searchData.searchResults,
          searchQuery: payload.searchData.searchQuery,
          message: payload.searchData.message
        }
      };
    case searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        allTimezoneEntriesSearchData: {
          searchResults: payload.searchData.searchResults,
          searchQuery: payload.searchData.searchQuery,
          message: payload.searchData.message
        }
      };
    case searchActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userSearchData: {
          searchResults: payload.searchData.searchResults,
          searchQuery: payload.searchData.searchQuery,
          message: payload.searchData.message
        }
      };
    case searchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS:
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
            payload.updatedTimezoneEntry
          )
        },
        allTimezoneEntriesSearchData: {
          ...state.allTimezoneEntriesSearchData,
          searchResults: ArrayUtils.updateItemInList(
            state.allTimezoneEntriesSearchData.searchResults,
            idNames.TIMEZONE_ENTRY_ID,
            payload.updatedTimezoneEntry
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
        },
        allTimezoneEntriesSearchData: {
          ...state.allTimezoneEntriesSearchData,
          searchResults: ArrayUtils.removeItemFromList(
            state.allTimezoneEntriesSearchData.searchResults,
            idNames.TIMEZONE_ENTRY_ID,
            payload.timezoneEntryId
          )
        }
      };
    case searchActionTypes.CLEAR_ALL_SEARCHES:
      return {
        ...state,
        userSearchData: initialState.userSearchData,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData,
        allTimezoneEntriesSearchData: initialState.allTimezoneEntriesSearchData
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
    case searchActionTypes.CLEAR_ALL_TIMEZONE_ENTRIES_SEARCH:
      return {
        ...state,
        allTimezoneEntriesSearchData: initialState.allTimezoneEntriesSearchData
      };
    //SEARCH OPTIONS STATE
    case searchActionTypes.CHANGE_SELECTED_DROPDOWN:
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          selectedOption: { ...payload.selectedDropdown }
        }
      };
    case searchActionTypes.CHANGE_SELECTED_FILTER:
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          filterOptions: {
            ...state.searchOptions.filterOptions,
            [payload.selectedSearchOption]: payload.newFilterOptions
          }
        }
      };
    default:
      return state;
  }
};

export default searchReducer;

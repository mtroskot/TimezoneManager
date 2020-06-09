import { SearchActionTypes, TimezoneActionTypes, UserActionTypes } from 'src/types/store/actionTypes';
import { ArrayUtils } from 'src/utils';
import { eDropdowns, eFilters, eIDName } from 'src/types/enums';
import { iDropdownOption, iSavedTimezoneEntry, iSearchData, iUser } from 'src/types/interfaces';
import { dropdownOptions } from 'src/constants/search';
import { tFilterOptions } from 'src/types/types';
import { SearchActions } from 'src/types/store/searchActions';
import { UserActions } from 'src/types/store/userActions';
import { TimezoneActions } from 'src/types/store/timezoneActions';

export interface SearchState {
  userSearchData: iSearchData<iUser>;
  timezoneEntriesSearchData: iSearchData<iSavedTimezoneEntry>;
  allTimezoneEntriesSearchData: iSearchData<iSavedTimezoneEntry>;
  searchOptions: {
    selectedOption: iDropdownOption;
    filterOptions: tFilterOptions;
  };
}

export const initialState: SearchState = {
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
      [eDropdowns.OWN_ENTRIES]: [
        { value: eFilters.ENTRY_NAME, label: 'Name', selected: true },
        { value: eFilters.CITY_NAME, label: 'City name', selected: true },
        { value: eFilters.GMT, label: 'GMT', selected: true }
      ],
      [eDropdowns.USERS]: [
        { value: eFilters.FIRST_NAME, label: 'First Name', selected: true },
        { value: eFilters.LAST_NAME, label: 'Last Name', selected: true },
        { value: eFilters.EMAIL_ADDRESS, label: 'Email Address', selected: true }
      ],
      [eDropdowns.ALL_ENTRIES]: [
        { value: eFilters.ENTRY_NAME, label: 'Name', selected: true },
        { value: eFilters.CITY_NAME, label: 'City name', selected: true },
        { value: eFilters.GMT, label: 'GMT', selected: true }
      ]
    }
  }
};

const searchReducer = (state = initialState, action: SearchActions | UserActions | TimezoneActions): SearchState => {
  switch (action.type) {
    //SEARCH DATA STATE
    case SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          searchResults: action.payload.searchData.searchResults,
          searchQuery: action.payload.searchData.searchQuery,
          message: action.payload.searchData.message
        }
      };
    case SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES_SUCCESS:
      return {
        ...state,
        allTimezoneEntriesSearchData: {
          searchResults: action.payload.searchData.searchResults,
          searchQuery: action.payload.searchData.searchQuery,
          message: action.payload.searchData.message
        }
      };
    case SearchActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userSearchData: {
          searchResults: action.payload.searchData.searchResults,
          searchQuery: action.payload.searchData.searchQuery,
          message: action.payload.searchData.message
        }
      };
    case SearchActionTypes.UPDATE_SEARCHED_USER_INFO_SUCCESS:
      return {
        ...state,
        userSearchData: {
          ...state.userSearchData,
          searchResults: ArrayUtils.updateItemInList<iUser>(
            state.userSearchData.searchResults,
            eIDName.USER_ID,
            action.payload.updatedUserInfo
          )
        }
      };
    case TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          ...state.timezoneEntriesSearchData,
          searchResults: ArrayUtils.updateItemInList<iSavedTimezoneEntry>(
            state.timezoneEntriesSearchData.searchResults,
            eIDName.TIMEZONE_ENTRY_ID,
            action.payload.updatedTimezoneEntry
          )
        },
        allTimezoneEntriesSearchData: {
          ...state.allTimezoneEntriesSearchData,
          searchResults: ArrayUtils.updateItemInList<iSavedTimezoneEntry>(
            state.allTimezoneEntriesSearchData.searchResults,
            eIDName.TIMEZONE_ENTRY_ID,
            action.payload.updatedTimezoneEntry
          )
        }
      };
    case UserActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        userSearchData: {
          ...state.userSearchData,
          searchResults: ArrayUtils.removeItemFromList<iUser>(state.userSearchData.searchResults, eIDName.USER_ID, action.payload.userId)
        }
      };
    case TimezoneActionTypes.DELETE_TIMEZONE_ENTRY_SUCCESS:
      return {
        ...state,
        timezoneEntriesSearchData: {
          ...state.timezoneEntriesSearchData,
          searchResults: ArrayUtils.removeItemFromList<iSavedTimezoneEntry>(
            state.timezoneEntriesSearchData.searchResults,
            eIDName.TIMEZONE_ENTRY_ID,
            action.payload.timezoneEntryId
          )
        },
        allTimezoneEntriesSearchData: {
          ...state.allTimezoneEntriesSearchData,
          searchResults: ArrayUtils.removeItemFromList<iSavedTimezoneEntry>(
            state.allTimezoneEntriesSearchData.searchResults,
            eIDName.TIMEZONE_ENTRY_ID,
            action.payload.timezoneEntryId
          )
        }
      };
    case SearchActionTypes.CLEAR_ALL_SEARCHES:
      return {
        ...state,
        userSearchData: initialState.userSearchData,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData,
        allTimezoneEntriesSearchData: initialState.allTimezoneEntriesSearchData
      };
    case SearchActionTypes.CLEAR_USERS_SEARCH:
      return {
        ...state,
        userSearchData: initialState.userSearchData
      };
    case SearchActionTypes.CLEAR_TIMEZONE_ENTRIES_SEARCH:
      return {
        ...state,
        timezoneEntriesSearchData: initialState.timezoneEntriesSearchData
      };
    case SearchActionTypes.CLEAR_ALL_TIMEZONE_ENTRIES_SEARCH:
      return {
        ...state,
        allTimezoneEntriesSearchData: initialState.allTimezoneEntriesSearchData
      };
    //SEARCH OPTIONS STATE
    case SearchActionTypes.CHANGE_SELECTED_DROPDOWN:
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          selectedOption: { ...action.payload.selectedDropdown }
        }
      };
    case SearchActionTypes.CHANGE_SELECTED_FILTER:
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          filterOptions: {
            ...state.searchOptions.filterOptions,
            [action.payload.selectedSearchOption]: action.payload.newFilterOptions
          }
        }
      };
    default:
      return state;
  }
};

export default searchReducer;

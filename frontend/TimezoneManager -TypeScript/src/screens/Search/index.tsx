import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CustomButton, KeyboardAvoidAndDismissView, SearchBar,TimezoneSearchResults } from 'src/components';
import UserSearchResults from "src/screens/Search/SearchResults/UserSearchResults";
import FilterOptions from 'src/screens/Search/FilterOptions';
import SearchResults from 'src/screens/Search/SearchResults';
import SafeAreaView from 'react-native-safe-area-view';
import {
  allowedSearchOptionsSelector,
  searchOptionsSelector,
  searchSelector,
  selectedDropdownOptionSelector
} from 'src/store/search/searchSelectors';
import {
  changeSelectedDropdown,
  changeSelectedFilter,
  clearAllSearches,
  searchAllTimezoneEntries,
  searchUserTimezoneEntries,
  searchUsers
} from 'src/store/search/searchActions';
import { togglePopupMessage } from 'src/store/ui/uiActions';
import { deleteTimezoneEntry } from 'src/store/timezone/timezoneActions';
import { deleteUser } from 'src/store/user/userActions';
import { checkIfLoadingSelector, updatingItemIdSelector } from 'src/store/ui/uiSelectors';
import { connect } from 'react-redux';
import axios, { CancelTokenSource } from 'axios';
import { NavigationService } from 'src/services';
import { HooksUtils, StringUtils } from 'src/utils';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Search/styles';
import { StoreState } from 'src/store/rootReducer';
import { SearchActionTypes, TimezoneActionTypes, UserActionTypes } from 'src/types/store/actionTypes';
import { eDropdowns, eIcons, eIDName } from 'src/types/enums';
import { eScreenNames } from 'src/types/navigation';
import { iDropdownOption, iSavedTimezoneEntry, iSearchData, iUser } from 'src/types/interfaces';
import { tFilterOptions } from 'src/types/types';

const CancelToken = axios.CancelToken;
let cancelTokenSource: CancelTokenSource | null = null;

interface Props {
  isSearching: boolean;
  deletingItemId: number;
  updatingItemId: number;
  search: {
    userSearchData: iSearchData<iUser>;
    timezoneEntriesSearchData: iSearchData<iSavedTimezoneEntry>;
    allTimezoneEntriesSearchData: iSearchData<iSavedTimezoneEntry>;
  };
  filterOptions: tFilterOptions;
  selectedSearchOption: iDropdownOption;
  allowedOptions: iDropdownOption[];
  deleteTimezoneEntry: typeof deleteTimezoneEntry;
  searchUserTimezoneEntries: typeof searchUserTimezoneEntries;
  searchUsers: typeof searchUsers;
  clearAllSearches: typeof clearAllSearches;
  deleteUser: typeof deleteUser;
  searchAllTimezoneEntries: typeof searchAllTimezoneEntries;
  changeSelectedDropdown: typeof changeSelectedDropdown;
  changeSelectedFilter: typeof changeSelectedFilter;
  togglePopupMessage: typeof togglePopupMessage;
}

const Search: React.FC<Props> = (props) => {
  //STATE
  const { deletingItemId, updatingItemId, isSearching, search, filterOptions, selectedSearchOption, allowedOptions } = props;
  const { userSearchData, timezoneEntriesSearchData, allTimezoneEntriesSearchData } = search;
  const [searchInput, setSearchInput] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const entriesSelected = [eDropdowns.OWN_ENTRIES, eDropdowns.ALL_ENTRIES].includes(selectedSearchOption.value);
  const allEntriesSelected = selectedSearchOption.value === eDropdowns.ALL_ENTRIES;
  const prevFilters = HooksUtils.usePrevious(filterOptions);

  //LIFECYCLE METHODS
  HooksUtils.useDidMountUnmount(
    () => {
      props.clearAllSearches();
    },
    () => {
      props.clearAllSearches();
    }
  );

  useEffect(() => {
    cancelTokenSource = CancelToken.source();
    let timeoutHandler: NodeJS.Timeout | null = null;
    if (StringUtils.isNotEmpty(searchInput)) {
      timeoutHandler = setTimeout(() => {
        const filtersChanged = filterOptions !== prevFilters;
        if (entriesSelected) {
          allEntriesSelected
            ? props.searchAllTimezoneEntries(searchInput, filtersChanged, cancelTokenSource!.token)
            : props.searchUserTimezoneEntries(searchInput, filtersChanged, cancelTokenSource!.token);
        } else {
          props.searchUsers(searchInput, filtersChanged, cancelTokenSource!.token);
        }
      }, 500);
    } else if (StringUtils.isEmpty(searchInput)) {
      props.clearAllSearches();
    }
    return () => {
      cancelTokenSource!.cancel();
      clearTimeout(timeoutHandler as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, filterOptions, selectedSearchOption]);

  //METHODS
  function toggleFilterOptions() {
    setShowFilterOptions(!showFilterOptions);
  }

  /**
   * Switches filter option. Before switching checks if at least one switch is active after change.
   * @param switchValue Bool
   * @param filterValue String
   */
  function onFilterChange(switchValue: boolean, filterValue: string) {
    if (switchValue === false) {
      const enabledCount = filterOptions[selectedSearchOption.value].reduce((acc, currEl) => {
        return currEl.selected === true ? acc + 1 : acc;
      }, 0);
      if (enabledCount === 1) {
        props.togglePopupMessage('At least one filter must be selected');
        return;
      }
    }
    const newFilterOptions = filterOptions[selectedSearchOption.value].map((option) => {
      const newOption = { ...option };
      if (filterValue === newOption.value) {
        newOption.selected = switchValue;
      }
      return newOption;
    });
    props.changeSelectedFilter(newFilterOptions, selectedSearchOption.value);
  }

  /**
   * Finds selected entry for edit and passes it as prop to edit screen.
   * @param itemId {Number|String} The id of selected entry for edit
   */
  function onEdit(itemId: number) {
    if (!entriesSelected) {
      const user = userSearchData.searchResults.find((item) => item[eIDName.USER_ID] === itemId);
      NavigationService.push(eScreenNames.AUTH_EDIT, { user });
    } else {
      let timezoneEntry = null;
      if (allEntriesSelected) {
        timezoneEntry = allTimezoneEntriesSearchData.searchResults.find((item) => item[eIDName.TIMEZONE_ENTRY_ID] === itemId);
      } else {
        timezoneEntry = timezoneEntriesSearchData.searchResults.find((item) => item[eIDName.TIMEZONE_ENTRY_ID] === itemId);
      }
      NavigationService.push(eScreenNames.TIMEZONE_EDIT, { timezoneEntry });
    }
  }

  /**
   * Prompts user whether he wants to delete the entry
   * @param itemId {Number|String}  The id of selected entry for delete
   */
  function onDelete(itemId: number) {
    Alert.alert(
      'Item delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => deleteItem(itemId) }
      ],
      { cancelable: false }
    );
  }

  function deleteItem(itemId: number) {
    entriesSelected ? props.deleteTimezoneEntry(itemId) : props.deleteUser(itemId);
  }
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function onDropdownSelect(selectedDropdown: iDropdownOption) {
    props.changeSelectedDropdown(selectedDropdown);
    setShowDropdown(!showDropdown);
  }

  //RENDER
  let data: iUser[] | iSavedTimezoneEntry[] = timezoneEntriesSearchData.searchResults;
  if (entriesSelected && allEntriesSelected) {
    data = allTimezoneEntriesSearchData.searchResults;
  } else if (!entriesSelected) {
    data = userSearchData.searchResults;
  }
  const loadingText = entriesSelected ? 'Searching entries' : 'Searching users';
  let searchMessage = timezoneEntriesSearchData.message;
  if (entriesSelected && allEntriesSelected) {
    searchMessage = allTimezoneEntriesSearchData.message;
  } else if (!entriesSelected) {
    searchMessage = userSearchData.message;
  }
  const ListItem = entriesSelected ? TimezoneSearchResults : UserSearchResults;
  const idName = entriesSelected ? eIDName.TIMEZONE_ENTRY_ID : eIDName.USER_ID;
  const dropdownProps = {
    selectedOption: selectedSearchOption.label,
    options: allowedOptions,
    onSelect: onDropdownSelect,
    showDropdown,
    dropdownItemKeyName: 'label'
  };
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <KeyboardAvoidAndDismissView viewStyle={styles.container}>
        <SearchBar
          viewStyle={styles.searchBar}
          placeholder={'Type something to search'}
          clearInput={() => setSearchInput('')}
          searchInput={searchInput}
          handleInput={setSearchInput}
        />
        <CustomButton
          iconProps={{ name: eIcons.FILTER, color: showFilterOptions ? '#f64812' : '#000' }}
          onPress={toggleFilterOptions}
          tOpacityStyle={styles.filterButton}
        />
      </KeyboardAvoidAndDismissView>
      <FilterOptions
        {...{
          showFilterOptions,
          dropdownProps,
          toggleDropdown,
          filterOptions: filterOptions[selectedSearchOption.value],
          onFilterChange
        }}
      />
      <SearchResults
        {...{
          data,
          ListItem,
          searchType: selectedSearchOption.label.toLowerCase(),
          onEdit,
          onDelete,
          idName,
          updatingItemId,
          deletingItemId,
          isSearching,
          loadingText,
          searchMessage
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isSearching: checkIfLoadingSelector(state)([
    SearchActionTypes.SEARCH_USER_TIMEZONE_ENTRIES,
    SearchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES,
    SearchActionTypes.SEARCH_USERS
  ]),
  deletingItemId: updatingItemIdSelector(state)([TimezoneActionTypes.DELETE_TIMEZONE_ENTRY, UserActionTypes.DELETE_USER]),
  updatingItemId: updatingItemIdSelector(state)([TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY, UserActionTypes.UPDATE_USER_INFO]),
  search: searchSelector(state),
  filterOptions: searchOptionsSelector(state).filterOptions,
  allowedOptions: allowedSearchOptionsSelector(state),
  selectedSearchOption: selectedDropdownOptionSelector(state)
});

const mapDispatchToProps = {
  deleteTimezoneEntry,
  searchUserTimezoneEntries,
  searchUsers,
  clearAllSearches,
  deleteUser,
  searchAllTimezoneEntries,
  changeSelectedDropdown,
  changeSelectedFilter,
  togglePopupMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));

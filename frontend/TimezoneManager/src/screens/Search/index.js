import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CustomButton, KeyboardAvoidAndDismissView, SearchBar } from 'src/components';
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
import axios from 'axios';
import { NavigationService } from 'src/services';
import { FlatListUtils, HooksUtils, StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import { screenNames } from 'src/constants/navigation';
import {
  dropdownOptionPropTypes,
  filterOptionsPropTypes,
  timezoneEntriesSearchDataPropTypes,
  userSearchDataPropTypes
} from 'src/constants/propTypes';
import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { dropdowns } from 'src/constants/search';
import { idNames } from 'src/constants/idKeyNames';
import { icons } from 'src/constants/icons';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Search/styles';

const CancelToken = axios.CancelToken;
let source = null;

const Search = props => {
  //STATE
  const {
    deletingItemId,
    updatingItemId,
    isSearching,
    search,
    filterOptions,
    selectedSearchOption,
    allowedOptions
  } = props;
  const { userSearchData, timezoneEntriesSearchData, allTimezoneEntriesSearchData } = search;
  const [searchInput, setSearchInput] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const entriesSelected = [dropdowns.OWN_ENTRIES, dropdowns.ALL_ENTRIES].includes(selectedSearchOption.value);
  const allEntriesSelected = selectedSearchOption.value === dropdowns.ALL_ENTRIES;
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
    source = CancelToken.source();
    let handler = null;
    if (StringUtils.isNotEmpty(searchInput)) {
      handler = setTimeout(() => {
        const filtersChanged = filterOptions !== prevFilters;
        if (entriesSelected) {
          allEntriesSelected
            ? props.searchAllTimezoneEntries(searchInput, filtersChanged, source.token)
            : props.searchUserTimezoneEntries(searchInput, filtersChanged, source.token);
        } else {
          props.searchUsers(searchInput, filtersChanged, source.token);
        }
      }, 500);
    } else if (StringUtils.isEmpty(searchInput)) {
      props.clearAllSearches();
    }
    return () => {
      source.cancel();
      clearTimeout(handler);
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
  function onFilterChange(switchValue, filterValue) {
    if (switchValue === false) {
      const enabledCount = filterOptions[selectedSearchOption.value].reduce((acc, currEl) => {
        return currEl.selected === true ? acc + 1 : acc;
      }, 0);
      if (enabledCount === 1) {
        props.togglePopupMessage('At least one filter must be selected');
        return;
      }
    }

    const newFilterOptions = filterOptions[selectedSearchOption.value].map(option => {
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
  function onEdit(itemId) {
    if (!entriesSelected) {
      const user = userSearchData.searchResults.find(item => item[idNames.USER_ID] === itemId);
      NavigationService.push(screenNames.AUTH_EDIT, { user });
    } else {
      let timezoneEntry = null;
      if (allEntriesSelected) {
        timezoneEntry = allTimezoneEntriesSearchData.searchResults.find(
          item => item[idNames.TIMEZONE_ENTRY_ID] === itemId
        );
      } else {
        timezoneEntry = timezoneEntriesSearchData.searchResults.find(
          item => item[idNames.TIMEZONE_ENTRY_ID] === itemId
        );
      }
      NavigationService.push(screenNames.TIMEZONE_EDIT, { timezoneEntry });
    }
  }

  /**
   * Prompts user whether he wants to delete the entry
   * @param itemId {Number|String}  The id of selected entry for delete
   */
  function onDelete(itemId) {
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

  function deleteItem(itemId) {
    entriesSelected ? props.deleteTimezoneEntry(itemId) : props.deleteUser(itemId);
  }
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function onDropdownSelect(selectedDropdown) {
    props.changeSelectedDropdown(selectedDropdown);
    setShowDropdown(!showDropdown);
  }

  //RENDER
  let data = timezoneEntriesSearchData.searchResults;
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
  const renderItem = entriesSelected ? FlatListUtils.renderEntries : FlatListUtils.renderAvatars;
  const idName = entriesSelected ? idNames.TIMEZONE_ENTRY_ID : idNames.USER_ID;
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
          iconProps={{ name: icons.FILTER, color: showFilterOptions ? '#f64812' : '#000' }}
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
          renderItem,
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

Search.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  deletingItemId: PropTypes.number,
  updatingItemId: PropTypes.number,
  search: PropTypes.shape({
    userSearchData: userSearchDataPropTypes.isRequired,
    timezoneEntriesSearchData: timezoneEntriesSearchDataPropTypes.isRequired,
    allTimezoneEntriesSearchData: timezoneEntriesSearchDataPropTypes.isRequired
  }).isRequired,
  filterOptions: filterOptionsPropTypes.isRequired,
  selectedSearchOption: dropdownOptionPropTypes.isRequired,
  allowedOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  deleteTimezoneEntry: PropTypes.func.isRequired,
  searchUserTimezoneEntries: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearAllSearches: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  searchAllTimezoneEntries: PropTypes.func.isRequired,
  changeSelectedDropdown: PropTypes.func.isRequired,
  changeSelectedFilter: PropTypes.func.isRequired,
  togglePopupMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSearching: checkIfLoadingSelector(state)([
    searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
    searchActionTypes.SEARCH_ALL_TIMEZONE_ENTRIES,
    searchActionTypes.SEARCH_USERS
  ]),
  deletingItemId: updatingItemIdSelector(state)([
    timezoneActionTypes.DELETE_TIMEZONE_ENTRY,
    userActionTypes.DELETE_USER
  ]),
  updatingItemId: updatingItemIdSelector(state)([
    timezoneActionTypes.UPDATE_TIMEZONE_ENTRY,
    userActionTypes.UPDATE_USER_INFO
  ]),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Search));

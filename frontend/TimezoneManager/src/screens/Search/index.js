import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CustomButton, KeyboardAvoidAndDismissView, SearchBar } from 'src/components';
import FilterOptions from 'src/screens/Search/FilterOptions';
import SearchResults from 'src/screens/Search/SearchResults';
import SafeAreaView from 'react-native-safe-area-view';
import { searchSelector } from 'src/store/search/searchSelectors';
import {
  clearAllSearches,
  searchAllTimezoneEntries,
  searchTimezoneEntries,
  searchUsers
} from 'src/store/search/searchActions';
import { deleteTimezoneEntry } from 'src/store/timezone/timezoneActions';
import { deleteUser } from 'src/store/user/userActions';
import { connect } from 'react-redux';
import { mainUserRoleSelector } from 'src/store/user/userSelectors';
import { checkIfLoadingSelector, updatingItemIdSelector } from 'src/store/ui/uiSelectors';
import axios from 'axios';
import { NavigationService } from 'src/services';
import { AppUtils, FlatListUtils, HooksUtils, StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import { screenNames } from 'src/constants/navigation';
import { timezoneEntriesSearchDataPropTypes, userSearchDataPropTypes } from 'src/constants/propTypes';
import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { filters } from 'src/constants/search';
import { idNames } from 'src/constants/idKeyNames';
import { icons } from 'src/constants/icons';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Search/styles';

const filterOptionsInitialState = [
  Object.freeze({ value: filters.OWN_ENTRIES, label: 'Own entries', enabled: true, selected: true }),
  Object.freeze({ value: filters.USERS, label: 'Users', enabled: true, selected: false }),
  Object.freeze({ value: filters.ALL_ENTRIES, label: 'All entries', enabled: true, selected: false })
];
const CancelToken = axios.CancelToken;
let source = null;

const Search = props => {
  //STATE
  const { deletingItemId, updatingItemId, isSearching, search, userRole } = props;
  const [searchInput, setSearchInput] = useState('');
  const [filterOptions, setFilterOptions] = useState(filterOptionsInitialState);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const selectedOption = filterOptions.find(option => option.selected === true);
  const entriesSelected = selectedOption.label.includes('entries');
  const allEntriesSelected = selectedOption.value === filters.ALL_ENTRIES;

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
        if (entriesSelected) {
          allEntriesSelected
            ? props.searchAllTimezoneEntries(searchInput, source.token)
            : props.searchTimezoneEntries(searchInput, source.token);
        } else {
          props.searchUsers(searchInput, source.token);
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
  }, [searchInput, filterOptions]);

  //METHODS
  function toggleFilterOptions() {
    setShowFilterOptions(!showFilterOptions);
  }

  /**
   * Switches filter option. Before switching checks if user has permission to use selected filterValue
   * and if at least one switch is active after change.
   * @param switchValue Bool
   * @param filterValue String
   */
  function onFilterChange(switchValue, filterValue) {
    if (!AppUtils.checkIfUserHasRightsForFilterOptions(filterValue, userRole)) {
      alert('Unauthorized action');
      return;
    }
    const newFilterOptions = filterOptions.map(option => {
      const newOption = { ...option };
      if (filterValue === newOption.value) {
        newOption.selected = true;
      } else {
        newOption.selected = false;
      }
      return newOption;
    });
    setFilterOptions(newFilterOptions);
  }

  /**
   * Finds selected entry for edit and passes it as prop to edit screen.
   * @param itemId {Number|String} The id of selected entry for edit
   */
  function onEdit(itemId) {
    if (!entriesSelected) {
      const user = search.userSearchData.searchResults.find(item => item[idNames.USER_ID] === itemId);
      NavigationService.push(screenNames.AUTH_EDIT, { user });
    } else {
      let timezoneEntry = null;
      if (allEntriesSelected) {
        timezoneEntry = search.allTimezoneEntriesSearchData.searchResults.find(
          item => item[idNames.TIMEZONE_ENTRY_ID] === itemId
        );
      } else {
        timezoneEntry = search.timezoneEntriesSearchData.searchResults.find(
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

  //RENDER
  let data = search.timezoneEntriesSearchData.searchResults;
  if (entriesSelected && allEntriesSelected) {
    data = search.allTimezoneEntriesSearchData.searchResults;
  } else if (!entriesSelected) {
    data = search.userSearchData.searchResults;
  }
  const loadingText = entriesSelected ? 'Searching entries' : 'Searching users';
  let searchMessage = search.timezoneEntriesSearchData.message;
  if (entriesSelected && allEntriesSelected) {
    searchMessage = search.allTimezoneEntriesSearchData.message;
  } else if (!entriesSelected) {
    searchMessage = search.userSearchData.message;
  }
  const renderItem = entriesSelected ? FlatListUtils.renderEntries : FlatListUtils.renderAvatars;
  const idName = entriesSelected ? idNames.TIMEZONE_ENTRY_ID : idNames.USER_ID;
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
      <FilterOptions {...{ showFilterOptions, filterOptions, onFilterChange }} />
      <SearchResults
        {...{
          data,
          renderItem,
          searchType: selectedOption.label.toLowerCase(),
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
  userRole: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  deletingItemId: PropTypes.number,
  updatingItemId: PropTypes.number,
  search: PropTypes.exact({
    userSearchData: userSearchDataPropTypes.isRequired,
    timezoneEntriesSearchData: timezoneEntriesSearchDataPropTypes.isRequired,
    allTimezoneEntriesSearchData: timezoneEntriesSearchDataPropTypes.isRequired
  }).isRequired,
  deleteTimezoneEntry: PropTypes.func.isRequired,
  searchTimezoneEntries: PropTypes.func.isRequired,
  searchAllTimezoneEntries: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearAllSearches: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRole: mainUserRoleSelector(state),
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
  search: searchSelector(state)
});

const mapDispatchToProps = {
  deleteTimezoneEntry,
  searchTimezoneEntries,
  searchUsers,
  clearAllSearches,
  deleteUser,
  searchAllTimezoneEntries
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Search));

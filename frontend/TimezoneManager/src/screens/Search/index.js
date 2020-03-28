import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CustomButton, KeyboardAvoidAndDismissView, SearchBar } from 'src/components';
import FilterOptions from 'src/screens/Search/FilterOptions';
import SearchResults from 'src/screens/Search/SearchResults';
import SafeAreaView from 'react-native-safe-area-view';
import { searchSelector } from 'src/store/search/searchSelectors';
import { deleteTimezoneEntry } from 'src/store/timezone/timezoneActions';
import { clearAllSearches, searchTimezoneEntries, searchUsers } from 'src/store/search/searchActions';
import { connect } from 'react-redux';
import { userInfoSelector } from 'src/store/user/userSelectors';
import { checkIfLoadingSelector, updatingItemIdSelector } from 'src/store/ui/uiSelectors';
import axios from 'axios';
import { NavigationService } from 'src/services';
import { AppUtils, FlatListUtils, HooksUtils, StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import { screenNames } from 'src/constants/navigation';
import { timezoneEntriesSearchDataPropTypes, userSearchDataPropTypes } from 'src/constants/propTypes';
import { searchActionTypes, timezoneActionTypes, userActionTypes } from 'src/constants/actionTypes';
import { filterOptions } from 'src/constants/search';
import { idNames } from 'src/constants/idKeyNames';
import { icons } from 'src/constants/icons';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Search/styles';

const filterOptionsInitialState = [
  Object.freeze({ value: filterOptions.OWN_ENTRIES, label: 'Own entries', enabled: true, selected: true }),
  Object.freeze({ value: filterOptions.USERS, label: 'Users', enabled: true, selected: false }),
  Object.freeze({ value: filterOptions.ALL_ENTRIES, label: 'All entries', enabled: true, selected: false })
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
  const areEntriesSelected = selectedOption.label.includes('entries');

  //LIFECYCLE METHODS
  HooksUtils.useDidMountUnmount(
    () => {},
    () => {
      props.clearAllSearches();
    }
  );

  useEffect(() => {
    source = CancelToken.source();
    let handler = null;
    if (StringUtils.isNotEmpty(searchInput)) {
      handler = setTimeout(() => {
        areEntriesSelected
          ? props.searchTimezoneEntries(searchInput, source.token)
          : props.searchUsers(searchInput, source.token);
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
   *
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

  function onEdit(itemId) {
    if (!areEntriesSelected) {
      const user = search.userSearchData.searchResults.find(item => item[idNames.USER_ID] === itemId);
      NavigationService.push(screenNames.AUTH_EDIT, { user });
    } else {
      const timezoneEntry = search.timezoneEntriesSearchData.searchResults.find(
        item => item[idNames.TIMEZONE_ENTRY_ID] === itemId
      );
      NavigationService.push(screenNames.TIMEZONE_EDIT, { timezoneEntry });
    }
  }

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
    if (areEntriesSelected) {
      props.deleteTimezoneEntry(itemId);
    }
  }

  //RENDER
  const data = areEntriesSelected
    ? search.timezoneEntriesSearchData.searchResults
    : search.userSearchData.searchResults;
  const loadingText = areEntriesSelected ? 'Searching entries' : 'Searching users';
  const searchMessage = areEntriesSelected ? search.timezoneEntriesSearchData.message : search.userSearchData.message;
  const renderItem = areEntriesSelected ? FlatListUtils.renderEntries : FlatListUtils.renderAvatars;
  const idName = areEntriesSelected ? idNames.TIMEZONE_ENTRY_ID : idNames.USER_ID;
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
    timezoneEntriesSearchData: timezoneEntriesSearchDataPropTypes.isRequired
  }).isRequired,
  deleteTimezoneEntry: PropTypes.func.isRequired,
  searchTimezoneEntries: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearAllSearches: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRole: userInfoSelector(state).role,
  isSearching: checkIfLoadingSelector(state)([
    searchActionTypes.SEARCH_TIMEZONE_ENTRIES,
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
  clearAllSearches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Search));

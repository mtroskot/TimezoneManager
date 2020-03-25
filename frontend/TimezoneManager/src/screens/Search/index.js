import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { CustomButton, SearchBar } from 'src/components';
import FilterOptions from 'src/screens/Search/FilterOptions';
import SearchResults from 'src/screens/Search/SearchResults';
import { icons } from 'src/constants/icons';
import SafeAreaView from 'react-native-safe-area-view';
import { mockEntries, mockUsers } from 'src/constants/mockData';
import { ListUtils } from 'src/utils';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Search/styles';
import { NavigationService } from 'src/services';
import { screenNames } from 'src/constants/navigation';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterOptions, setFilterOptions] = useState([
    { value: 'OWN_ENTRIES', label: 'Own entries', enabled: true, selected: true },
    { value: 'USERS', label: 'Users', enabled: true, selected: false },
    { value: 'ALL_ENTRIES', label: 'All entries', enabled: true, selected: false }
  ]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  function toggleFilterOptions() {
    setShowFilterOptions(!showFilterOptions);
  }

  function onFilterChange(switchValue, filterValue) {
    const newFilterOptions = [...filterOptions];
    newFilterOptions.forEach(option => {
      if (filterValue === option.value) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    setFilterOptions(newFilterOptions);
  }

  function onEdit(itemId) {
    const isUserEdit = !selectedOption.label.includes('entries');
    if (isUserEdit) {
      const user = mockUsers.find(user => user.id === itemId);
      NavigationService.push(screenNames.AUTH_EDIT, { user });
    } else {
      const timezoneEntry = mockEntries.find(entry => entry.id === itemId);
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
    console.log('item', itemId);
  }

  //RENDER
  const selectedOption = filterOptions.find(option => option.selected === true);
  const areEntriesSelected = selectedOption.label.includes('entries');
  const data = areEntriesSelected ? mockEntries : mockUsers;
  const renderItem = areEntriesSelected ? ListUtils.renderEntries : ListUtils.renderAvatars;
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={styles.container}>
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
      </View>
      <FilterOptions {...{ showFilterOptions, filterOptions, onFilterChange }} />
      <SearchResults {...{ data, renderItem, searchType: selectedOption.label.toLowerCase(), onEdit, onDelete }} />
    </SafeAreaView>
  );
};

Search.propTypes = {};

export default React.memo(Search);

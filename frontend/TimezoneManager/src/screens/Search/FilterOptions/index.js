import React from 'react';
import { Switch, Text, View } from 'react-native';
import { Dropdown, FloatingLabelTextInput } from 'src/components';
import PropTypes from 'prop-types';
import { dropdownOptionPropTypes, filterOptionPropTypes } from 'src/constants/propTypes';
import styles from 'src/screens/Search/FilterOptions/styles';
import { icons } from 'src/constants/icons';
import { appStyles } from 'src/styles';

const FilterOptions = ({ showFilterOptions, dropdownProps, toggleDropdown, filterOptions, onFilterChange }) => {
  if (!showFilterOptions) {
    return null;
  }
  return (
    <View style={styles.container}>
      {dropdownProps.options.length > 1 && (
        <>
          <Text style={appStyles.headerText}>Search Options</Text>
          <View style={styles.dropdownForm}>
            <FloatingLabelTextInput
              label={'Selected Search Option'}
              value={dropdownProps.selectedOption}
              placeholderTextColor="#949EA0"
              editable={false}
              onTextBoxPress={toggleDropdown}
              iconProps={{
                name: !dropdownProps.showDropdown ? icons.DOWN_ARROW : icons.UP_ARROW,
                prefix: 'ios-',
                onIconPress: toggleDropdown,
                color: '#7d7d7d'
              }}
            />
            <View style={styles.dropdown}>
              <Dropdown {...dropdownProps} />
            </View>
          </View>
        </>
      )}
      <Text style={appStyles.headerText}>Filter Options</Text>
      {filterOptions.map(option => {
        return (
          <View key={option.value} style={styles.switchContainer}>
            <View style={styles.labelView}>
              <Text>{option.label}</Text>
            </View>
            <View style={styles.switch}>
              <Switch value={option.selected} onValueChange={value => onFilterChange(value, option.value)} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

FilterOptions.propTypes = {
  showFilterOptions: PropTypes.bool.isRequired,
  filterOptions: PropTypes.arrayOf(filterOptionPropTypes.isRequired).isRequired,
  dropdownProps: PropTypes.exact({
    selectedOption: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(dropdownOptionPropTypes.isRequired).isRequired,
    onSelect: PropTypes.func.isRequired,
    showDropdown: PropTypes.bool.isRequired,
    dropdownItemKeyName: PropTypes.string.isRequired
  }).isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default React.memo(FilterOptions);

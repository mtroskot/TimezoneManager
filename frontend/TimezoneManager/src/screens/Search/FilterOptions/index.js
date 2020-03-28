import React from 'react';
import { Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/screens/Search/FilterOptions/styles';
import { appStyles } from 'src/styles';

const FilterOptions = ({ showFilterOptions, filterOptions, onFilterChange }) => {
  if (!showFilterOptions) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={appStyles.headerText}>Filter Options</Text>
      {filterOptions.map(option => {
        return (
          <View key={option.value} style={styles.switchContainer}>
            <View style={styles.labelView}>
              <Text>{option.label}</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                value={option.selected}
                disabled={!option.enabled}
                onValueChange={value => onFilterChange(value, option.value)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

FilterOptions.propTypes = {
  showFilterOptions: PropTypes.bool.isRequired,
  filterOptions: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      enabled: PropTypes.bool.isRequired,
      selected: PropTypes.bool.isRequired
    })
  ),
  onFilterChange: PropTypes.func.isRequired
};

export default React.memo(FilterOptions);

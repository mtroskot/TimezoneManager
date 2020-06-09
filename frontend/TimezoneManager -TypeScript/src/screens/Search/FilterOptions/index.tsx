import React from 'react';
import { Switch, Text, View } from 'react-native';
import { Dropdown, FloatingLabelTextInput } from 'src/components';
import styles from 'src/screens/Search/FilterOptions/styles';
import { appStyles } from 'src/styles';
import { iDropdownOption, iFilterOption } from '../../../types/interfaces';
import { eIcons } from '../../../types/enums';

interface Props {
  showFilterOptions: boolean;
  filterOptions: iFilterOption[];
  dropdownProps: {
    selectedOption: string;
    options: iDropdownOption[];
    onSelect: (selectedDropdown: iDropdownOption) => void;
    showDropdown: boolean;
    dropdownItemKeyName: string;
  };
  toggleDropdown: () => void;
  onFilterChange: (switchValue: boolean, optionValue: string) => void;
}

const FilterOptions: React.FC<Props> = ({ showFilterOptions, dropdownProps, toggleDropdown, filterOptions, onFilterChange }) => {
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
                name: !dropdownProps.showDropdown ? eIcons.DOWN_ARROW : eIcons.UP_ARROW,
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
      {filterOptions.map((option) => {
        return (
          <View key={option.value} style={styles.switchContainer}>
            <View style={styles.labelView}>
              <Text>{option.label}</Text>
            </View>
            <View style={styles.switch}>
              <Switch value={option.selected} onValueChange={(value) => onFilterChange(value, option.value)} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default React.memo(FilterOptions);

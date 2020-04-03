import React from 'react';
import { FlatList, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles, { itemHeight } from 'src/components/Dropdown/styles';

function dropdownItem(item, value, selectedOption, onSelect) {
  const isSelected = selectedOption === value;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={isSelected ? styles.activeContainer : styles.inactiveContainer}
      onPress={() => onSelect(item)}>
      <Text style={isSelected ? styles.activeText : styles.inactiveText}>{value}</Text>
    </TouchableOpacity>
  );
}

const Dropdown = ({
  selectedOption,
  options,
  onSelect,
  showDropdown,
  viewStyle,
  dropdownItemKeyName,
  initialScrollIndex
}) => {
  if (!showDropdown) {
    return null;
  }

  function getItemLayout(data, index) {
    return { length: data.length, offset: itemHeight * index, index };
  }

  return (
    <View style={[styles.container, viewStyle]}>
      <FlatList
        data={options}
        renderItem={({ item }) => {
          let value = item;
          if (dropdownItemKeyName) {
            value = item[dropdownItemKeyName];
          }
          return dropdownItem(item, value, selectedOption, onSelect);
        }}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={getItemLayout}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
      />
    </View>
  );
};

Dropdown.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  viewStyle: ViewPropTypes.style,
  dropdownItemKeyName: PropTypes.string,
  initialScrollIndex: PropTypes.number
};

Dropdown.defaultProps = {
  viewStyle: undefined,
  dropdownItemKeyName: undefined
};

export default React.memo(Dropdown);

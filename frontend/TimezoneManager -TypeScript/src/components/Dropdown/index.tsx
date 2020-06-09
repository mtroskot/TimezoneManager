import React from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import DropdownItem from 'src/components/Dropdown/DropdownItem';
import styles, { itemHeight } from 'src/components/Dropdown/styles';

interface Props {
  selectedOption: string;
  options: readonly any[];
  onSelect: (item: any) => void;
  showDropdown: boolean;
  viewStyle?: ViewStyle;
  dropdownItemKeyName?: string;
  initialScrollIndex?: number;
}

const Dropdown: React.FC<Props> = ({
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

  function getItemLayout(data: any, index: number) {
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
          return <DropdownItem {...{ item, value, selectedOption, onSelect }} />;
        }}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={getItemLayout}
        keyExtractor={(item, index: number) => index.toString()}
        bounces={false}
      />
    </View>
  );
};

Dropdown.defaultProps = {
  viewStyle: undefined,
  dropdownItemKeyName: undefined,
  initialScrollIndex: 0
};

export default React.memo(Dropdown);

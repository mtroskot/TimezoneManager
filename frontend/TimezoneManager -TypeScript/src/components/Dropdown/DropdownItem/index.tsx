import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from 'src/components/Dropdown/styles';

interface Props {
  item: any;
  value: string;
  selectedOption: string;
  onSelect: (item: any) => void;
}

const DropdownItem: React.FC<Props> = ({ item, value, selectedOption, onSelect }) => {
  const isSelected = selectedOption === value;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={isSelected ? styles.activeContainer : styles.inactiveContainer}
      onPress={() => onSelect(item)}>
      <Text style={isSelected ? styles.activeText : styles.inactiveText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(DropdownItem);

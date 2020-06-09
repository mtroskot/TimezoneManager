import React from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import { StringUtils } from 'src/utils';
import styles from 'src/components/SearchBar/styles';
import { dimensions } from 'src/styles';
import { eIcons } from 'src/types/enums';

const { rem } = dimensions;

interface Props {
  searchInput: string;
  handleInput: (value: string) => void;
  clearInput: () => void;
  placeholder?: string;
  viewStyle?: ViewStyle;
}

const SearchBar: React.FC<Props> = ({ searchInput, handleInput, placeholder, viewStyle, clearInput }) => {
  const searchInputEmpty: boolean = StringUtils.isEmpty(searchInput);
  return (
    <View style={[styles.textInputView, viewStyle]}>
      <TextInput
        style={styles.textInputStyle}
        value={searchInput}
        placeholder={placeholder}
        placeholderTextColor="#949EA0"
        onChangeText={handleInput}
        hitSlop={{ top: 20, bottom: 20 }}
      />
      <CustomButton
        iconStyle={styles.iconStyle}
        iconProps={{
          name: searchInputEmpty ? eIcons.SEARCH : eIcons.CLOSE_CIRCLE,
          color: searchInputEmpty ? '#959595' : '#404040',
          size: 20 * rem
        }}
        onPress={clearInput}
        disabled={searchInputEmpty}
      />
    </View>
  );
};

SearchBar.defaultProps = {
  placeholder: 'Search'
};

export default React.memo(SearchBar);

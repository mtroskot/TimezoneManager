import React from 'react';
import { TextInput, View, ViewPropTypes } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import { StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import { icons } from 'src/constants/icons';
import styles from 'src/components/SearchBar/styles';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const SearchBar = props => {
  const { searchInput, handleInput, placeholder, viewStyle, clearInput } = props;
  const searchInputEmpty = StringUtils.isEmpty(searchInput);
  return (
    <View style={[styles.textInputView, viewStyle]}>
      <TextInput
        style={styles.textInputStyle}
        value={searchInput}
        placeholder={placeholder}
        placeholderTextColor="#949EA0"
        onChangeText={handleInput}
      />
      <CustomButton
        iconStyle={styles.iconStyle}
        iconProps={{
          name: searchInputEmpty ? icons.SEARCH : icons.CLOSE_CIRCLE,
          color: searchInputEmpty ? '#959595' : '#404040',
          size: 20 * rem
        }}
        onPress={clearInput}
        disabled={searchInputEmpty}
      />
    </View>
  );
};

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  viewStyle: ViewPropTypes.style,
  clearInput: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  placeholder: 'Search'
};

export default React.memo(SearchBar);

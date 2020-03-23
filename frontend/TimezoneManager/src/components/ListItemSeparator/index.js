import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import styles from 'src/components/ListItemSeparator/styles';

const ListItemSeparator = ({ viewStyle }) => {
  return <View style={[styles.defaultSeparator, viewStyle]} />;
};

ListItemSeparator.propTypes = {
  viewStyle: ViewPropTypes.style
};

export default React.memo(ListItemSeparator);

import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from 'src/components/ListItemSeparator/styles';

interface Props {
  viewStyle: ViewStyle;
}

const ListItemSeparator: React.FC<Props> = ({ viewStyle }) => {
  return <View style={[styles.defaultSeparator, viewStyle]} />;
};

export default React.memo(ListItemSeparator);

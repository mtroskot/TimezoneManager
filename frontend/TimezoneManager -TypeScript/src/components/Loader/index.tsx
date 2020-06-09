import React from 'react';
import { ActivityIndicator, Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from 'src/components/Loader/styles';

interface Props {
  text?: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  size?: number | 'small' | 'large';
  color?: string;
}

const Loader: React.FC<Props> = ({ text, size, color, viewStyle, textStyle }) => (
  <View style={[styles.container, viewStyle]}>
    <ActivityIndicator size={size} color={color} />
    {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
  </View>
);

Loader.defaultProps = {
  text: undefined,
  size: 'large',
  color: '#1e5ad4'
};

export default React.memo(Loader);

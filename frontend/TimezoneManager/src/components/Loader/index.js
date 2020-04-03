import React from 'react';
import { ActivityIndicator, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/components/Loader/styles';

const Loader = ({ text, size, color, viewStyle, textStyle }) => (
  <View style={[styles.container, viewStyle]}>
    <ActivityIndicator size={size} color={color} />
    {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
  </View>
);

Loader.propTypes = {
  text: PropTypes.string,
  viewStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  size: PropTypes.string,
  color: PropTypes.string
};

Loader.defaultProps = {
  text: undefined,
  size: 'large',
  color: '#1e5ad4'
};

export default React.memo(Loader);

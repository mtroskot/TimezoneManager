import React from 'react';
import { Image, Text, View } from 'react-native';
import sadFace from 'src/assets/images/emoji/sadFace.png';
import PropTypes from 'prop-types';
import styles from 'src/components/Error404/styles';

const Error404 = ({ size, errorText }) => (
  <View style={styles.container}>
    <Image source={sadFace} style={[styles.image, size ? { height: size, width: size } : null]} />
    <Text style={styles.errorText}>{errorText}</Text>
  </View>
);

Error404.propTypes = {
  errorText: PropTypes.string,
  size: PropTypes.number
};

Error404.defaultProps = {
  errorText: 'Oops Something went wrong'
};

export default React.memo(Error404);

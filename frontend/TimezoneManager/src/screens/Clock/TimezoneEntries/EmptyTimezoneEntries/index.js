import React from 'react';
import { Text, View } from 'react-native';
import { CustomButton, Error404, Loader } from 'src/components';
import styles from 'src/screens/Clock/TimezoneEntries/EmptyTimezoneEntries/styles';
import PropTypes from 'prop-types';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const EmptyTimezoneEntries = ({ isError, isLoading, loadingText, animateIcon }) => {
  if (isLoading) {
    return <Loader text={loadingText} />;
  }
  if (isError) {
    return <Error404 size={100 * rem} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Currently no entries</Text>
      <Text style={styles.infoText}>Add one bellow</Text>
      <CustomButton
        disabled
        iconProps={{ name: 'arrow-down', color: '#000', prefix: 'md-', size: 40 * rem }}
        viewStyle={styles.arrow}
        animationProps={{ animateIcon, direction: 'vertical' }}
      />
    </View>
  );
};

EmptyTimezoneEntries.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  animateIcon: PropTypes.bool.isRequired
};

export default React.memo(EmptyTimezoneEntries);

import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/screens/Clock/TimezoneEntries/TimezoneEntry/styles';

const TimezoneEntry = ({ name, city, differenceToGMT, differenceToBrowser, time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Name: {name}</Text>
      <View style={styles.inlineView}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.timezoneInfo}>City: {city}</Text>
          <Text style={styles.timezoneInfo}>Time: {time}</Text>
        </View>
        <View>
          <Text style={styles.timezoneInfo}>
            {'Difference between\nbrowser’s time:'} {differenceToBrowser}
          </Text>
          <Text style={styles.timezoneInfo}>Difference to GMT: {differenceToGMT}</Text>
        </View>
      </View>
    </View>
  );
};

TimezoneEntry.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  differenceToGMT: PropTypes.number.isRequired,
  differenceToBrowser: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired
};

export default React.memo(TimezoneEntry);

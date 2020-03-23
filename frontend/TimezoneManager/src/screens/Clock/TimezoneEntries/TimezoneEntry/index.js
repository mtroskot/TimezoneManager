import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/screens/Clock/TimezoneEntries/TimezoneEntry/styles';

const TimezoneEntry = ({ minutes, name, city, differenceToGMT, differenceToBrowser, timezoneTime }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inlineView}>
        <View>
          <Text style={styles.timezoneInfo}>Name: {name}</Text>
          <Text style={styles.timezoneInfo}>City: {city}</Text>
        </View>
        <View>
          <Text style={styles.timezoneInfo}>Difference between the browser’s time: {differenceToBrowser}</Text>
          <Text style={styles.timezoneInfo}>Difference to GMT: {differenceToGMT}</Text>
          <Text style={styles.timezoneInfo}>
            Time: {timezoneTime}:{minutes}
          </Text>
        </View>
      </View>
    </View>
  );
};

TimezoneEntry.propTypes = {
  minutes: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  differenceToGMT: PropTypes.number.isRequired,
  differenceToBrowser: PropTypes.number.isRequired,
  timezoneTime: PropTypes.string.isRequired
};

export default React.memo(TimezoneEntry);

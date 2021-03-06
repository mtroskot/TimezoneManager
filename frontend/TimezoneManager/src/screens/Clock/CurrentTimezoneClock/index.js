import React from 'react';
import { Text, View } from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import styles from 'src/screens/Clock/CurrentTimezoneClock/styles';
import PropTypes from 'prop-types';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const CurrentTimezoneClock = ({ currTime, month, timezoneOffset }) => {
  return (
    <View style={styles.container}>
      <AnalogClock
        size={170 * rem}
        colorNumber="#000000"
        colorCenter="#919191"
        colorHour="#FF8F00"
        colorMinutes="#FFC400"
      />
      <Text style={styles.currentTimezone}>Current Timezone GMT {timezoneOffset}</Text>
      <Text style={styles.timeMonth}>
        {currTime} {month}
      </Text>
    </View>
  );
};

CurrentTimezoneClock.propTypes = {
  currTime: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  timezoneOffset: PropTypes.string.isRequired
};

export default React.memo(CurrentTimezoneClock);

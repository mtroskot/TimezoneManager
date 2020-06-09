import React from 'react';
import { Text, View } from 'react-native';
// @ts-ignore
import AnalogClock from 'react-native-clock-analog';
import styles from 'src/screens/Clock/CurrentTimezoneClock/styles';
import { dimensions } from 'src/styles';

const { rem } = dimensions;

interface Props {
  currTime: string;
  month: string;
  timezoneOffset: string;
}

const CurrentTimezoneClock: React.FC<Props> = ({ currTime, month, timezoneOffset }) => (
  <View style={styles.container}>
    <AnalogClock size={170 * rem} colorNumber="#000000" colorCenter="#919191" colorHour="#FF8F00" colorMinutes="#FFC400" />
    <Text style={styles.currentTimezone}>Current Timezone GMT {timezoneOffset}</Text>
    <Text style={styles.timeMonth}>
      {currTime} {month}
    </Text>
  </View>
);

export default React.memo(CurrentTimezoneClock);

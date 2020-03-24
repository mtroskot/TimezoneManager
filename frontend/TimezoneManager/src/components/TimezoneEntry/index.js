import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from 'src/components/TimezoneEntry/styles';

const TimezoneEntry = ({ name, city, differenceToGMT, differenceToBrowser, time, customStyle, displayInColumn }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.header}>Name: {name}</Text>
      <View style={[styles.inlineView, displayInColumn ? { flexDirection: 'column' } : null]}>
        <View style={styles.cityTimeView}>
          <Text style={styles.timezoneInfo}>
            City: <Text style={styles.highlightText}>{city}</Text>
          </Text>
          <Text style={styles.timezoneInfo}>
            Time: <Text style={styles.highlightText}>{time}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.timezoneInfo}>
            {'Difference between\nbrowser’s time:'} <Text style={styles.highlightText}>{differenceToBrowser}</Text>
          </Text>
          <Text style={styles.timezoneInfo}>
            Difference to GMT: <Text style={styles.highlightText}>{differenceToGMT}</Text>
          </Text>
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
  time: PropTypes.string.isRequired,
  customStyle: ViewPropTypes.style,
  displayInColumn: PropTypes.bool
};

export default React.memo(TimezoneEntry);

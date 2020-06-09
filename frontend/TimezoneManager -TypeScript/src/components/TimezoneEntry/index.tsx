import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import styles from 'src/components/TimezoneEntry/styles';

interface Props {
  name: string;
  cityName: string;
  differenceToGMT: string;
  differenceToBrowser: string;
  time: string;
  customStyle?: ViewStyle;
  displayInColumn?: boolean;
}

const TimezoneEntry: React.FC<Props> = ({ name, cityName, differenceToGMT, differenceToBrowser, time, customStyle, displayInColumn }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.header}>Name: {name}</Text>
      <View style={[styles.inlineView, displayInColumn ? styles.columnDirection : null]}>
        <View style={styles.column}>
          <Text style={styles.timezoneInfo}>
            City: <Text style={styles.highlightText}>{cityName}</Text>
          </Text>
          <Text style={styles.timezoneInfo}>
            Time: <Text style={styles.highlightText}>{time}</Text>
          </Text>
        </View>
        <View style={styles.column}>
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

export default React.memo(TimezoneEntry);

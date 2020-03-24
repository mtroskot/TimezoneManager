import React, { useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CurrentTimezoneClock from 'src/screens/Clock/CurrentTimezoneClock';
import TimezoneEntries from 'src/screens/Clock/TimezoneEntries';
import { CustomButton } from 'src/components';
import { NavigationService } from 'src/services';
import { DateUtils, HooksUtils, ListUtils } from 'src/utils';
import { clockFormat, dateFormat } from 'src/constants/date';
import { icons } from 'src/constants/icons';
import { screenNames } from 'src/constants/navigation';
import { mockEntries } from 'src/constants/mockData';
import styles from 'src/screens/Clock/styles';
import { appStyles, dimensions } from 'src/styles';
const { rem } = dimensions;

let intervalHandler = null;
let timezoneOffset = new Date().getTimezoneOffset() / -60;
timezoneOffset =
  timezoneOffset > 0 ? `+${timezoneOffset}` : timezoneOffset < 0 ? `-${timezoneOffset}` : `${timezoneOffset}`;

const ClockManager = () => {
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState('');
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  HooksUtils.useDidMountUnmount(
    () => {
      clockInterval();
      fetchTimezoneEntries();
    },
    () => {
      clearInterval(intervalHandler);
    }
  );

  function clockInterval() {
    intervalHandler = setInterval(() => {
      const date = new Date();
      setDate(date);
      setMinutes(DateUtils.convertShortTimeToLongTime(date.getMinutes()));
    }, 1000);
  }

  function fetchTimezoneEntries() {
    try {
      setIsLoading(true);
      setError(false);
      setTimeout(() => {
        setEntries(mockEntries);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      setError(true);
      console.log('fetchTimezoneEntries error', error);
    }
  }

  function onAddTimezonePress() {
    NavigationService.navigate(screenNames.ADD_NEW_TIMEZONE);
  }

  function onSearchPress() {
    NavigationService.navigate(screenNames.SEARCH);
  }

  const listEmpty = error || isLoading || entries.length === 0;
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={styles.container}>
        <CurrentTimezoneClock
          currTime={DateUtils.formatDate(date, clockFormat)}
          month={DateUtils.formatDate(date, dateFormat)}
          timezoneOffset={timezoneOffset}
        />
        <CustomButton
          iconProps={{ name: icons.SEARCH, color: '#000', size: 35 * rem }}
          tOpacityStyle={styles.searchButton}
          onPress={onSearchPress}
        />
        <TimezoneEntries
          {...{
            minutes,
            entries,
            renderItem: ListUtils.renderEntries,
            error,
            isLoading,
            loadingText: 'Loading Timezone Entries'
          }}
        />
        <View style={!listEmpty ? styles.absolutePosition : null}>
          <CustomButton
            iconProps={{ name: icons.GLOBE }}
            viewStyle={[styles.globeButton]}
            onPress={onAddTimezonePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ClockManager);

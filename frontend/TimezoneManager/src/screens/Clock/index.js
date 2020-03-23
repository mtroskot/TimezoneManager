import React, { useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CurrentTimezoneClock from 'src/screens/Clock/CurrentTimezoneClock';
import TimezoneEntries from 'src/screens/Clock/TimezoneEntries';
import { CustomButton } from 'src/components';
import { DateUtils, HooksUtils } from 'src/utils';
import { clockFormat, dateFormat } from 'src/constants/date';
import styles from 'src/screens/Clock/styles';
import { icons } from 'src/constants/icons';

const mockEntries = [
  {
    id: 1,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 2,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 3,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 4,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 5,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 6,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 7,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 8,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  },
  {
    id: 9,
    name: 'Foo',
    city: 'Bar',
    differenceToGMT: -6
  }
];
let intervalHandler = null;
let timezoneOffset = new Date().getTimezoneOffset() / -60;
timezoneOffset =
  timezoneOffset > 0 ? `+${timezoneOffset}` : timezoneOffset < 0 ? `-${timezoneOffset}` : `${timezoneOffset}`;

const ClockManager = () => {
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [animateIcon, setAnimateIcon] = useState(true);
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
      setSeconds(DateUtils.convertShortTimeToLongTime(date.getSeconds()));
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
    setAnimateIcon(!animateIcon);
  }

  const listEmpty = error || isLoading || entries.length === 0;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CurrentTimezoneClock
          currTime={DateUtils.formatDate(date, clockFormat)}
          month={DateUtils.formatDate(date, dateFormat)}
          timezoneOffset={timezoneOffset}
        />
        <TimezoneEntries
          {...{ minutes, seconds, entries, error, isLoading, loadingText: 'Loading Timezone Entries', animateIcon }}
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

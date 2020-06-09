import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CurrentTimezoneClock from 'src/screens/Clock/CurrentTimezoneClock';
import TimezoneEntries from 'src/screens/Clock/TimezoneEntries';
import { CustomButton } from 'src/components';
import { NavigationService } from 'src/services';
import { DateUtils, HooksUtils } from 'src/utils';
import { checkIfErrorSelector, checkIfLoadingSelector, checkIfRefreshingSelector } from 'src/store/ui/uiSelectors';
import { connect } from 'react-redux';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { fetchTimezoneEntries } from 'src/store/timezone/timezoneActions';
import styles from 'src/screens/Clock/styles';
import { appStyles, dimensions } from 'src/styles';
import { StoreState } from 'src/store/rootReducer';
import { iSavedTimezoneEntry } from 'src/types/interfaces';
import { eIcons } from 'src/types/enums';
import { eScreenNames } from 'src/types/navigation';
import { clockFormat, dateFormat } from 'src/utils/DateUtils';
import { TimezoneActionTypes } from 'src/types/store/actionTypes';

const { rem } = dimensions;

let intervalHandler: NodeJS.Timeout | null = null;
let timezoneOffset: number | string = new Date().getTimezoneOffset() / -60;
timezoneOffset = timezoneOffset > 0 ? `+${timezoneOffset}` : timezoneOffset < 0 ? `-${timezoneOffset}` : `${timezoneOffset}`;

interface Props {
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  timezoneEntries: iSavedTimezoneEntry[];
  fetchTimezoneEntries: typeof fetchTimezoneEntries;
}

const ClockManager: React.FC<Props> = (props) => {
  //STATE
  const { timezoneEntries, isLoading, isError, isRefreshing } = props;
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState('');

  //LIFECYCLE METHODS
  HooksUtils.useDidMountUnmount(
    () => {
      clockInterval();
      props.fetchTimezoneEntries();
    },
    () => {
      clearInterval(intervalHandler as NodeJS.Timeout);
    }
  );

  // METHODS
  function clockInterval() {
    intervalHandler = setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
      setMinutes(DateUtils.convertShortTimeToLongTime(newDate.getMinutes()));
    }, 100000);
  }

  const onRefresh = useCallback(() => {
    const refresh = true;
    props.fetchTimezoneEntries(refresh);
  }, [props]);

  function onAddTimezonePress() {
    NavigationService.push(eScreenNames.ADD_NEW_TIMEZONE);
  }

  function onSearchPress() {
    NavigationService.navigate(eScreenNames.SEARCH);
  }

  //RENDER
  const listEmpty = isError || isLoading || timezoneEntries.length === 0;
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={styles.container}>
        <CurrentTimezoneClock
          currTime={DateUtils.formatDate(date, clockFormat)}
          month={DateUtils.formatDate(date, dateFormat)}
          timezoneOffset={timezoneOffset as string}
        />
        <CustomButton
          iconProps={{ name: eIcons.SEARCH, color: '#000', size: 35 * rem }}
          tOpacityStyle={styles.searchButton}
          onPress={onSearchPress}
        />
        <TimezoneEntries
          {...{
            minutes,
            timezoneEntries,
            isError,
            isLoading,
            loadingText: 'Loading Timezone Entries',
            isRefreshing,
            onRefresh
          }}
        />
        <View style={!listEmpty ? styles.absolutePosition : null}>
          <CustomButton iconProps={{ name: eIcons.GLOBE }} viewStyle={styles.globeButton} onPress={onAddTimezonePress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isLoading: checkIfLoadingSelector(state)([TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES]),
  isRefreshing: checkIfRefreshingSelector(state)(TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES),
  isError: checkIfErrorSelector(state)([TimezoneActionTypes.FETCH_USER_TIMEZONE_ENTRIES]),
  timezoneEntries: timezoneEntriesSelector(state)
});

const mapDispatchToProps = {
  fetchTimezoneEntries
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClockManager));

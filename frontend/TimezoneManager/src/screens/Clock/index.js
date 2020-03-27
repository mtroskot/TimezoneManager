import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CurrentTimezoneClock from 'src/screens/Clock/CurrentTimezoneClock';
import TimezoneEntries from 'src/screens/Clock/TimezoneEntries';
import { CustomButton } from 'src/components';
import { NavigationService } from 'src/services';
import { DateUtils, FlatListUtils, HooksUtils } from 'src/utils';
import { checkIfErrorSelector, checkIfLoadingSelector, checkIfRefreshingSelector } from 'src/store/ui/uiSelectors';
import { timezoneActionTypes } from 'src/constants/actionTypes';
import { connect } from 'react-redux';
import { timezoneEntriesSelector } from 'src/store/timezone/timezoneSelectors';
import { fetchTimezoneEntries } from 'src/store/timezone/timezoneActions';
import { clockFormat, dateFormat } from 'src/constants/date';
import { icons } from 'src/constants/icons';
import { screenNames } from 'src/constants/navigation';
import styles from 'src/screens/Clock/styles';
import { appStyles, dimensions } from 'src/styles';
import PropTypes from 'prop-types';
import { timezoneEntryPropTypes } from 'src/constants/propTypes';
const { rem } = dimensions;

let intervalHandler = null;
let timezoneOffset = new Date().getTimezoneOffset() / -60;
timezoneOffset =
  timezoneOffset > 0 ? `+${timezoneOffset}` : timezoneOffset < 0 ? `-${timezoneOffset}` : `${timezoneOffset}`;

const ClockManager = props => {
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
      clearInterval(intervalHandler);
    }
  );

  // METHODS
  function clockInterval() {
    intervalHandler = setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
      setMinutes(DateUtils.convertShortTimeToLongTime(newDate.getMinutes()));
    }, 1000);
  }

  const onRefresh = useCallback(() => {
    const refresh = true;
    props.fetchTimezoneEntries(refresh);
  }, [props]);

  function onAddTimezonePress() {
    NavigationService.push(screenNames.ADD_NEW_TIMEZONE);
  }

  function onSearchPress() {
    NavigationService.navigate(screenNames.SEARCH);
  }

  //RENDER
  const listEmpty = isError || isLoading || timezoneEntries.length === 0;
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
            timezoneEntries,
            renderItem: FlatListUtils.renderEntries,
            isError,
            isLoading,
            loadingText: 'Loading Timezone Entries',
            isRefreshing,
            onRefresh
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

ClockManager.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  timezoneEntries: PropTypes.arrayOf(timezoneEntryPropTypes).isRequired,
  fetchTimezoneEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: checkIfLoadingSelector(state)([timezoneActionTypes.FETCH_TIMEZONE_ENTRIES]),
  isRefreshing: checkIfRefreshingSelector(state)(timezoneActionTypes.FETCH_TIMEZONE_ENTRIES),
  isError: checkIfErrorSelector(state)([timezoneActionTypes.FETCH_TIMEZONE_ENTRIES]),
  timezoneEntries: timezoneEntriesSelector(state)
});

const mapDispatchToProps = {
  fetchTimezoneEntries
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ClockManager));

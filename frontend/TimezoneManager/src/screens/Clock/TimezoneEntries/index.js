import React from 'react';
import { FlatList } from 'react-native';
import EmptyTimezoneEntries from 'src/screens/Clock/TimezoneEntries/EmptyTimezoneEntries';
import TimezoneEntry from 'src/screens/Clock/TimezoneEntries/TimezoneEntry';
import { ListItemSeparator } from 'src/components';
import { DateUtils } from 'src/utils';
import PropTypes from 'prop-types';
import styles from 'src/screens/Clock/TimezoneEntries/styles';

const date = new Date();
const TimezoneEntries = ({ minutes, entries, error, isLoading, loadingText }) => {
  return (
    <FlatList
      data={entries}
      renderItem={({ item }) => {
        const { name, city, differenceToGMT } = item;
        const convertedTime = DateUtils.convertTimeToSelectedTimezoneTime(date, differenceToGMT);
        const timezoneHours = new Date(convertedTime).getHours();
        const differenceToBrowser = timezoneHours - new Date().getHours();
        return (
          <TimezoneEntry
            {...{
              minutes,
              name,
              city,
              differenceToGMT,
              differenceToBrowser,
              timezoneTime: DateUtils.convertShortTimeToLongTime(timezoneHours)
            }}
          />
        );
      }}
      ListEmptyComponent={<EmptyTimezoneEntries {...{ error, isLoading, loadingText, animateIcon: true }} />}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[
        styles.contentContainer,
        entries.length !== 0 ? styles.nonEmptyContainer : styles.emptyContainer
      ]}
    />
  );
};

TimezoneEntries.propTypes = {
  minutes: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      differenceToGMT: PropTypes.number.isRequired
    })
  ).isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired
};

export default React.memo(TimezoneEntries);

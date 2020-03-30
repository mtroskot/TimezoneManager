import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyTimezoneEntries from 'src/screens/Clock/TimezoneEntries/EmptyTimezoneEntries';
import { ListItemSeparator } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/Clock/TimezoneEntries/styles';
import { timezoneEntryPropTypes } from 'src/constants/propTypes';
import { idNames } from 'src/constants/idKeyNames';

const TimezoneEntries = ({
  minutes,
  timezoneEntries,
  renderItem,
  isError,
  isLoading,
  loadingText,
  isRefreshing,
  onRefresh
}) => {
  return (
    <FlatList
      data={timezoneEntries}
      renderItem={({ item }) => renderItem(item, minutes)}
      ListEmptyComponent={<EmptyTimezoneEntries {...{ isError, isLoading, loadingText, animateIcon: true }} />}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item[idNames.TIMEZONE_ENTRY_ID].toString()}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      contentContainerStyle={[
        styles.contentContainer,
        timezoneEntries.length !== 0 ? styles.nonEmptyContainer : styles.emptyContainer
      ]}
    />
  );
};

TimezoneEntries.propTypes = {
  minutes: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  timezoneEntries: PropTypes.arrayOf(timezoneEntryPropTypes).isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default React.memo(TimezoneEntries);

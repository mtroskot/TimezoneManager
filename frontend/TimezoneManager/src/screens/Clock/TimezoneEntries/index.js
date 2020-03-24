import React from 'react';
import { FlatList } from 'react-native';
import EmptyTimezoneEntries from 'src/screens/Clock/TimezoneEntries/EmptyTimezoneEntries';
import { ListItemSeparator } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/Clock/TimezoneEntries/styles';

const TimezoneEntries = ({ minutes, entries, renderItem, error, isLoading, loadingText }) => {
  return (
    <FlatList
      data={entries}
      renderItem={({ item }) => renderItem(item, minutes)}
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
  renderItem: PropTypes.func.isRequired,
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

import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyTimezoneEntries from 'src/screens/Clock/TimezoneEntries/EmptyTimezoneEntries';
import { ListItemSeparator, TimezoneSearchResults } from 'src/components';
import styles from 'src/screens/Clock/TimezoneEntries/styles';
import { iSavedTimezoneEntry } from 'src/types/interfaces';
import { eIDName } from 'src/types/enums';

interface Props {
  minutes: string;
  timezoneEntries: ReadonlyArray<iSavedTimezoneEntry>;
  isError: boolean;
  isLoading: boolean;
  loadingText: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const TimezoneEntries: React.FC<Props> = ({ minutes, timezoneEntries, isError, isLoading, loadingText, isRefreshing, onRefresh }) => {
  return (
    <FlatList
      data={timezoneEntries}
      renderItem={({ item }: { item: iSavedTimezoneEntry }) => <TimezoneSearchResults minutes={minutes} entry={item} />}
      ListEmptyComponent={<EmptyTimezoneEntries {...{ isError, isLoading, loadingText, animateIcon: true }} />}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={(item) => item[eIDName.TIMEZONE_ENTRY_ID].toString()}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      contentContainerStyle={[styles.contentContainer, timezoneEntries.length !== 0 ? styles.nonEmptyContainer : styles.emptyContainer]}
    />
  );
};

export default React.memo(TimezoneEntries);

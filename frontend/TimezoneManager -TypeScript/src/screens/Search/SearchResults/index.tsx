import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListItemSeparator } from 'src/components';
import WithEditButtons from 'src/components/HOC/WithEditButtons';
import EmptySearchResults from 'src/screens/Search/SearchResults/EmptySearchResults';
import TimezoneSearchResults from '../../../components/TimezoneSearchResults';
import UserSearchResults from 'src/screens/Search/SearchResults/UserSearchResults';
import { appStyles } from 'src/styles';
import styles from 'src/screens/Search/SearchResults/styles';
import { iSavedTimezoneEntry, iUser } from 'src/types/interfaces';
import { eIDName } from 'src/types/enums';

interface Props {
  data: ReadonlyArray<iUser | iSavedTimezoneEntry> | null | undefined;
  searchType: string;
  ListItem: typeof UserSearchResults | typeof TimezoneSearchResults;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isSearching: boolean;
  idName: eIDName;
  loadingText: string;
  updatingItemId?: number;
  deletingItemId?: number;
  searchMessage?: string;
}

const SearchResults: React.FC<Props> = ({
  data,
  searchType,
  ListItem,
  onEdit,
  onDelete,
  isSearching,
  idName,
  updatingItemId,
  deletingItemId,
  loadingText,
  searchMessage
}) => {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={<Text style={appStyles.headerText}>Search results for {searchType}</Text>}
      ListEmptyComponent={<EmptySearchResults {...{ isSearching, searchMessage, loadingText }} />}
      renderItem={({ item }: { item: iUser | iSavedTimezoneEntry }) => (
        <WithEditButtons
          {...{
            WrappedComponent: <ListItem {...({ item } as any)} />,
            itemId: item[idName],
            onEdit,
            onDelete,
            deletingItemId,
            updatingItemId
          }}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={(item) => item[idName].toString()}
      contentContainerStyle={styles.listContentContainerStyle}
    />
  );
};

export default React.memo(SearchResults);

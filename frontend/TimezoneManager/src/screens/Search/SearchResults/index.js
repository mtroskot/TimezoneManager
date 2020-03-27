import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItemSeparator, Loader } from 'src/components';
import PropTypes from 'prop-types';
import { appStyles } from 'src/styles';
import { FlatListUtils } from 'src/utils';
import styles from 'src/screens/Search/SearchResults/styles';

const SearchResults = ({
  data,
  renderItem,
  searchType,
  onEdit,
  onDelete,
  idName,
  updatingItemId,
  deletingItemId,
  isSearching,
  loadingText,
  searchMessage
}) => {
  if (isSearching || searchMessage) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={appStyles.headerText}>Search results for {searchType}</Text>
        <View style={styles.container}>
          {isSearching ? <Loader text={loadingText} /> : <Text style={styles.infoText}>{searchMessage}</Text>}
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      ListHeaderComponent={<Text style={appStyles.headerText}>Search results for {searchType}</Text>}
      renderItem={({ item }) =>
        FlatListUtils.withEditButtons(renderItem(item), item[idName], onEdit, onDelete, deletingItemId, updatingItemId)
      }
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item[idName].toString()}
      contentContainerStyle={styles.listContentContainerStyle}
    />
  );
};

SearchResults.propTypes = {
  idName: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  searchType: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updatingItemId: PropTypes.number,
  deletingItemId: PropTypes.number,
  isSearching: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  searchMessage: PropTypes.string
};

export default React.memo(SearchResults);

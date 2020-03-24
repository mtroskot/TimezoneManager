import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListItemSeparator } from 'src/components';
import PropTypes from 'prop-types';
import { appStyles } from 'src/styles';
import { ListUtils } from 'src/utils';

const SearchResults = ({ data, renderItem, searchType, onEdit, onDelete }) => {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={<Text style={appStyles.headerText}>Search results for {searchType}</Text>}
      renderItem={({ item }) => ListUtils.withEditButtons(renderItem(item), onEdit, onDelete)}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item.id.toString()}
    />
  );
};

SearchResults.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  searchType: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default React.memo(SearchResults);

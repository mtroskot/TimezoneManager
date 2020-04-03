import React from 'react';
import { Text, View } from 'react-native';
import { Loader } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/Search/SearchResults/EmptySearchResults/styles';

const EmptySearchResults = ({ isSearching, searchMessage, loadingText }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.container}>
      {isSearching ? <Loader text={loadingText} /> : <Text style={styles.infoText}>{searchMessage}</Text>}
    </View>
  </View>
);

EmptySearchResults.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  searchMessage: PropTypes.string,
  loadingText: PropTypes.string.isRequired
};

export default React.memo(EmptySearchResults);

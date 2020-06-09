import React from 'react';
import { Text, View } from 'react-native';
import { Loader } from 'src/components';
import styles from 'src/screens/Search/SearchResults/EmptySearchResults/styles';

interface Props {
  isSearching: boolean;
  loadingText: string;
  searchMessage?: string;
}

const EmptySearchResults: React.FC<Props> = ({ isSearching, searchMessage, loadingText }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.container}>
      {isSearching ? <Loader text={loadingText} /> : <Text style={styles.infoText}>{searchMessage}</Text>}
    </View>
  </View>
);

export default React.memo(EmptySearchResults);

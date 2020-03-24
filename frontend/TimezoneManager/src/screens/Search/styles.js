import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 20 * rem,
    flex: 0.85
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButton: {
    left: 10 * rem
  }
});

export default styles;

import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1
  },
  emptyContainer: {
    paddingBottom: 10 * rem
  },
  nonEmptyContainer: {
    paddingBottom: 80 * rem
  }
});

export default styles;

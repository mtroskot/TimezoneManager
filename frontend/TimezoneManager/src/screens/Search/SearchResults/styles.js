import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  infoText: {
    ...fonts.ubuntu.normal.medium,
    textAlign: 'center',
    fontSize: 20 * rem
  },
  listContentContainerStyle: {
    flexGrow: 1
  }
});

export default styles;

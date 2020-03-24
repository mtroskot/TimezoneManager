import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  inlineView: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButton: {
    marginHorizontal: 5 * rem
  },
  listContentContainerStyle: {
    alignSelf: 'center'
  }
});

export default styles;

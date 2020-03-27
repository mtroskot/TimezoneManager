import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButton: {
    marginHorizontal: 5 * rem
  }
});

export default styles;

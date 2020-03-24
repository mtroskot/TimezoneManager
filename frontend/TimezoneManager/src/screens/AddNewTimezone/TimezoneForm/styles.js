import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gmtSelectForm: {
    zIndex: 2
  },
  headerMargin: {
    marginVertical: 20 * rem
  },
  dropdown: {
    width: '90%',
    alignSelf: 'center',
    bottom: 10 * rem
  }
});

export default styles;

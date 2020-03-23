import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    ...fonts.ubuntu.normal.regular,
    textAlign: 'center',
    fontSize: 16 * rem,
    marginTop: 10 * rem
  }
});

export default styles;

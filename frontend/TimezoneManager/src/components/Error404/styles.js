import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    textAlign: 'center'
  },
  image: {
    height: 200 * rem,
    width: 200 * rem
  }
});

export default styles;

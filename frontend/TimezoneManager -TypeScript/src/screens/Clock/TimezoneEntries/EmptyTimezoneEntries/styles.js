import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  infoText: {
    ...fonts.ubuntu.normal.regular,
    textAlign: 'center',
    fontSize: 16 * rem
  },
  arrow: {
    alignSelf: 'center',
    marginTop: 20 * rem
  }
});

export default styles;

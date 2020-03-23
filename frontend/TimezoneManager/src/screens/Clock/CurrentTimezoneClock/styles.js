import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20 * rem
  },
  currentTimezone: {
    ...fonts.ubuntu.normal.light,
    textAlign: 'center',
    fontSize: 12 * rem,
    color: '#adadad',
    marginBottom: 5 * rem,
    marginTop: 20 * rem
  },
  timeMonth: {
    ...fonts.ubuntu.normal.regular,
    textAlign: 'center',
    fontSize: 16 * rem
  }
});

export default styles;

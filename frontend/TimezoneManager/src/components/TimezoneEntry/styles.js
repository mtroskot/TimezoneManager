import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    ...fonts.ubuntu.normal.medium,
    textAlign: 'center',
    fontSize: 18 * rem,
    marginBottom: 5 * rem
  },
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20 * rem
  },
  timezoneInfo: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    marginBottom: 4 * rem
  }
});

export default styles;

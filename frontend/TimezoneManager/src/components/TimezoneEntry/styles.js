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
    marginBottom: 7 * rem
  },
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20 * rem
  },
  columnDirection: {
    flexDirection: 'column'
  },
  column: {
    flex: 0.45
  },
  timezoneInfo: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    marginBottom: 4 * rem
  },
  highlightText: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 17 * rem
  }
});

export default styles;

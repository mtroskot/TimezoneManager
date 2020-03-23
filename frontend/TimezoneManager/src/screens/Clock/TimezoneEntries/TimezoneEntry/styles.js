import { StyleSheet } from 'react-native';
import { fonts } from 'src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  timezoneInfo: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 14
  }
});

export default styles;

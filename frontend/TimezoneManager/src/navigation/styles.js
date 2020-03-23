import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  headerLeft: {
    ...fonts.ubuntu.normal.medium,
    paddingLeft: 15 * rem,
    fontSize: 18 * rem
  },
  headerRight: {
    paddingRight: 15 * rem
  }
});

export default styles;

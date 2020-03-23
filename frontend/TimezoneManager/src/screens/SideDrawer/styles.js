import { Platform, StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem, width } = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width * 0.6
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20 * rem
  },
  picker: {
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 100 * rem : 50 * rem,
    overflow: 'hidden',
    marginTop: 10 * rem,
    marginLeft: Platform.OS === 'ios' ? 0 : 10 * rem
  },
  regular: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    margin: 10 * rem
  },
  italic: {
    ...fonts.ubuntu.italic.regular,
    fontSize: 16 * rem,
    margin: 10 * rem
  },
  topMargin: {
    marginTop: 20 * rem
  }
});

export default styles;

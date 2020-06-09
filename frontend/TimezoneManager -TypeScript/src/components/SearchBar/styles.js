import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    width: '88%',
    height: 60 * rem,
    borderWidth: 1 * rem,
    alignItems: 'center',
    borderRadius: 5 * rem,
    borderColor: '#b7bdc2',
    backgroundColor: 'white'
  },
  textInputStyle: {
    flex: 1,
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    marginLeft: 10 * rem
  },
  iconStyle: {
    marginHorizontal: 15 * rem
  }
});

export default styles;

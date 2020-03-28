import { StyleSheet } from 'react-native';
import dimensions from 'src/styles/dimensions';
import fonts from 'src/styles/fonts';
const { rem } = dimensions;

const appStyles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  submitButton: {
    backgroundColor: '#EAA79E',
    marginTop: 10 * rem,
    borderRadius: 5 * rem,
    paddingHorizontal: 20 * rem,
    paddingVertical: 15,
    width: '90%',
    alignSelf: 'center'
  },
  buttonText: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 16 * rem,
    textAlign: 'center',
    color: '#fff'
  },
  headerText: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 22 * rem,
    color: '#334144',
    textAlign: 'center'
  }
});

export default appStyles;

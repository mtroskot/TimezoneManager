import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center'
  },
  switchFormContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30 * rem
  },
  switchFormText: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 14 * rem,
    marginBottom: 5 * rem
  },
  formContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center'
  },
  firstNameInputView: {
    flex: 1
  },
  lastNameInputView: {
    flex: 1,
    marginLeft: 10 * rem
  },
  headerView: {
    marginVertical: 45 * rem
  },
  headerText: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 22 * rem,
    color: '#334144',
    textAlign: 'center'
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
  loginButtonText: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 16 * rem,
    textAlign: 'center',
    color: '#fff'
  }
});

export default styles;

import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
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
  }
});

export default styles;

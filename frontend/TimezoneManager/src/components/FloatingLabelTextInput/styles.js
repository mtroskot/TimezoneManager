import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;
const paddingLeft = 15 * rem;

const styles = StyleSheet.create({
  outerContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  container: {
    borderColor: '#DFE5EA',
    borderWidth: 1 * rem,
    borderRadius: 5 * rem,
    marginBottom: 10 * rem,
    height: 60 * rem,
    backgroundColor: '#F5F6F7'
  },
  errorContainer: {
    borderColor: 'red',
    marginBottom: 0
  },
  errorText: {
    ...fonts.ubuntu.normal.light,
    fontSize: 11 * rem,
    marginBottom: 10 * rem,
    color: 'red'
  },
  inlineView: {
    flexDirection: 'row',
    flex: 1
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: paddingLeft,
    marginBottom: 10 * rem
  },
  label: {
    ...fonts.ubuntu.normal.light,
    position: 'absolute',
    left: paddingLeft,
    color: '#949EA0',
    fontSize: 13 * rem
  },
  fixedLabel: {
    ...fonts.ubuntu.normal.light,
    position: 'absolute',
    left: paddingLeft,
    color: '#949EA0',
    fontSize: 13 * rem,
    bottom: 25 * rem
  },
  defaultInput: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    color: '#334144',
    padding: 0
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 15
  }
});

export default styles;

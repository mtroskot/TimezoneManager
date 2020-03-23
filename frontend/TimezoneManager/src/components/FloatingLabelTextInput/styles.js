import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;
const paddingLeft = 15 * rem;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderColor: '#DFE5EA',
    borderWidth: 1 * rem,
    alignSelf: 'center',
    borderRadius: 5 * rem,
    marginBottom: 10 * rem,
    height: 60 * rem,
    backgroundColor: '#F5F6F7'
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: paddingLeft,
    marginBottom: 10 * rem
  },
  label: {
    position: 'absolute',
    left: paddingLeft,
    color: '#949EA0',
    fontSize: 13 * rem
  },
  defaultInput: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 16 * rem,
    color: '#334144',
    padding: 0
  }
});

export default styles;

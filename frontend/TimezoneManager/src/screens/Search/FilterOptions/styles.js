import { Platform, StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10 * rem
  },
  switchContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center'
  },
  labelView: {
    flex: 1
  },
  switch: {
    marginVertical: 2 * rem
  },
  dropdownForm: {
    width: '80%',
    zIndex: Platform.OS === 'ios' ? 2 : null
  },
  dropdown: {
    width: '90%',
    alignSelf: 'center',
    bottom: 10 * rem
  }
});

export default styles;

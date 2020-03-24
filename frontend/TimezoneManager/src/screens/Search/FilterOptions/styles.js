import { StyleSheet } from 'react-native';
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
  }
});

export default styles;

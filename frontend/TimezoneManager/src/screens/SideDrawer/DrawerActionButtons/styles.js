import { StyleSheet } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;
const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10 * rem,
    backgroundColor: '#eee',
    marginTop: 10 * rem
  },
  drawerItemIcon: {
    marginRight: 10 * rem
  }
});

export default styles;

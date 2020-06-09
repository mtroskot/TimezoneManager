import { Platform, StyleSheet } from 'react-native';
import { Header } from 'react-navigation-stack';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  popupMessageView: {
    flex: 1,
    zIndex: 2,
    backgroundColor: '#4c4c4c',
    padding: 11 * rem,
    borderRadius: 20 * rem,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center'
  },
  message: {
    ...fonts.ubuntu.normal.regular,
    color: 'white',
    textAlign: 'center'
  },
  topPosition: {
    top: Platform.OS === 'ios' ? Header.HEIGHT + 30 * rem : Header.HEIGHT
  },
  bottomPosition: {
    bottom: Platform.OS === 'ios' ? 90 * rem : 60 * rem
  }
});

export default styles;

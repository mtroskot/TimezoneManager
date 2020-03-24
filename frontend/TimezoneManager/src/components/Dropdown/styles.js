import { Platform, StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const text = {
  ...fonts.ubuntu.normal.regular,
  paddingLeft: 30 * rem,
  fontSize: 16 * rem
};
const container = {
  paddingVertical: 15
};
const shadowIOS = {
  shadowOpacity: 0.2,
  shadowRadius: 5 * rem,
  shadowOffset: {
    height: 1,
    width: 0
  }
};
const shadowAndroid = {
  elevation: 3
};

export const itemHeight = container.paddingVertical * 2 + text.fontSize;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    maxHeight: 200 * rem,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 2,
    ...Platform.select({
      ios: shadowIOS,
      android: shadowAndroid
    })
  },
  activeText: {
    ...text,
    color: '#fff'
  },
  inactiveText: {
    ...text,
    color: '#131516'
  },
  activeContainer: {
    backgroundColor: '#0491A9',
    ...container
  },
  inactiveContainer: {
    backgroundColor: '#fff',
    ...container
  }
});

export default styles;

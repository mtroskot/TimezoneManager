import { StyleSheet } from 'react-native';
import { dimensions, fonts } from 'src/styles';
const { rem } = dimensions;

const styles = StyleSheet.create({
  inlineView: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10 * rem
  },
  avatar: {
    backgroundColor: '#a4a4a4',
    height: 60 * rem,
    width: 60 * rem,
    borderRadius: 30 * rem,
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 20 * rem
  },
  avatarInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20 * rem
  },
  avatarInfoTextTop: {
    ...fonts.ubuntu.normal.medium,
    fontSize: 20 * rem
  },
  avatarInfoTextBottom: {
    ...fonts.ubuntu.normal.regular,
    fontSize: 13 * rem
  }
});

export default styles;

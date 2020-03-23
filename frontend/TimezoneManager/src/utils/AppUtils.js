import { Animated, Platform } from 'react-native';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

/**
 * Returns the prefix, based on platform, needed for icon
 * @param iconName String The name of the icon
 * @param platformPrefix String If entered both platform will display same icon
 * @returns {String}
 */
function getIconForPlatform(iconName, platformPrefix) {
  if (platformPrefix) {
    return platformPrefix + iconName;
  }
  const prefix = Platform.OS === 'android' ? 'md-' : 'ios-';
  return prefix + iconName;
}

function startShake(shakeAnimation) {
  Animated.loop(
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 20 * rem, duration: 500, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -5 * rem, duration: 300, useNativeDriver: true })
    ])
  ).start();
}

export default {
  getIconForPlatform,
  startShake
};

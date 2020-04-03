import { Animated, Platform } from 'react-native';
import axios from 'axios';
import { ADMIN, MANAGER } from 'src/constants/userRoles';
import { filters } from 'src/constants/search';
import { dimensions } from 'src/styles';
import { DEFAULT_ERROR, NO_INTERNET, TIMEOUT } from 'src/constants/messages';
import store from 'src/store';
import { togglePopupMessage } from 'src/store/ui/uiActions';
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

function checkIfUserHasRightsForFilterOptions(filterOption, userRole) {
  if (userRole === ADMIN) {
    return true;
  }
  if (filterOption === filters.USERS && userRole === MANAGER) {
    return true;
  }
  if (filterOption === filters.OWN_ENTRIES) {
    return true;
  }
  return false;
}

function handleErrorMessage(error, position = 'top') {
  if (!axios.isCancel(error)) {
    if (error.message.toString().includes('Network')) {
      store.dispatch(togglePopupMessage(NO_INTERNET, position));
    } else if (error.message.toString().includes('timeout')) {
      store.dispatch(togglePopupMessage(TIMEOUT, position));
    } else {
      store.dispatch(togglePopupMessage(DEFAULT_ERROR, position));
    }
  }
}

export default {
  getIconForPlatform,
  startShake,
  checkIfUserHasRightsForFilterOptions,
  handleErrorMessage
};

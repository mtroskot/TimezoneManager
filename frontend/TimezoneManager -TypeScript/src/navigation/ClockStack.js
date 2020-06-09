import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ClockScreen from 'src/screens/Clock';
import { Text } from 'react-native';
import styles from 'src/navigation/styles';
import { CustomButton } from 'src/components';
import { NavigationService } from 'src/services';
import AddNewTimezoneScreen from 'src/screens/AddNewTimezone';
import SearchScreen from 'src/screens/Search';
import AuthScreen from 'src/screens/Auth';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideDrawer from 'src/screens/SideDrawer';
import { eIcons } from '../types/enums';
import { eScreenNames, eStackNames } from 'src/types/navigation';

const ClockStack = createStackNavigator({
  [eScreenNames.CLOCK]: {
    screen: ClockScreen,
    navigationOptions: () => ({
      headerLeft: <Text style={styles.headerLeft}>Clock</Text>,
      headerRight: (
        <CustomButton
          iconProps={{ name: eIcons.SETTINGS, color: '#000' }}
          viewStyle={styles.headerRight}
          onPress={NavigationService.openDrawer}
        />
      )
    })
  },
  [eScreenNames.ADD_NEW_TIMEZONE]: {
    screen: AddNewTimezoneScreen
  },
  [eScreenNames.TIMEZONE_EDIT]: {
    screen: AddNewTimezoneScreen
  },
  [eScreenNames.SEARCH]: {
    screen: SearchScreen
  },
  [eScreenNames.AUTH_EDIT]: {
    screen: AuthScreen
  }
});

ClockStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode
  };
};

const ClockStackDrawer = createDrawerNavigator(
  {
    [eStackNames.CLOCK_STACK_WITH_DRAWER]: ClockStack
  },
  {
    contentComponent: SideDrawer
  }
);

export default ClockStackDrawer;

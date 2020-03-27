import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames, stackNames } from 'src/constants/navigation';
import ClockScreen from 'src/screens/Clock';
import { Text } from 'react-native';
import styles from 'src/navigation/styles';
import { CustomButton } from 'src/components';
import { icons } from 'src/constants/icons';
import { NavigationService } from 'src/services';
import AddNewTimezoneScreen from 'src/screens/AddNewTimezone';
import SearchScreen from 'src/screens/Search';
import AuthScreen from 'src/screens/Auth';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideDrawer from 'src/screens/SideDrawer';

const ClockStack = createStackNavigator({
  [screenNames.CLOCK]: {
    screen: ClockScreen,
    navigationOptions: () => ({
      headerLeft: <Text style={styles.headerLeft}>Clock</Text>,
      headerRight: (
        <CustomButton
          iconProps={{ name: icons.SETTINGS, color: '#000' }}
          viewStyle={styles.headerRight}
          onPress={NavigationService.openDrawer}
        />
      )
    })
  },
  [screenNames.ADD_NEW_TIMEZONE]: {
    screen: AddNewTimezoneScreen
  },
  [screenNames.TIMEZONE_EDIT]: {
    screen: AddNewTimezoneScreen
  },
  [screenNames.SEARCH]: {
    screen: SearchScreen
  },
  [screenNames.AUTH_EDIT]: {
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
    [stackNames.CLOCK_STACK_WITH_DRAWER]: ClockStack
  },
  {
    contentComponent: SideDrawer
  }
);

export default ClockStackDrawer;

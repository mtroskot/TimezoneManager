import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { CustomButton } from 'src/components';
import SideDrawer from 'src/screens/SideDrawer';
import ClockScreen from 'src/screens/Clock';
import AuthScreen from 'src/screens/Auth';
import { screenNames, stackNames } from 'src/constants/navigation';
import styles from 'src/navigation/styles';
import { icons } from 'src/constants/icons';
import { NavigationService } from 'src/services';

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
  }
});

const AuthStack = createStackNavigator(
  {
    [screenNames.AUTH]: {
      screen: AuthScreen
    }
  },
  {
    headerMode: 'none'
  }
);

const AppStack = createStackNavigator(
  {
    [stackNames.AUTH_STACK]: AuthStack,
    [stackNames.CLOCK_STACK]: ClockStack
  },
  {
    initialRouteName: stackNames.AUTH_STACK,
    headerMode: 'none'
  }
);

AppStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode
  };
};

const Navigator = createDrawerNavigator(
  {
    [stackNames.APP_STACK]: AppStack
  },
  {
    contentComponent: SideDrawer
  }
);

export default createAppContainer(Navigator);

import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CustomButton } from 'src/components';
import ClockScreen from 'src/screens/Clock';
import AuthScreen from 'src/screens/Auth';
import { screenNames, stackNames } from 'src/constants/navigation';
import styles from 'src/navigation/styles';
import { icons } from 'src/constants/icons';

const ClockStack = createStackNavigator({
  [screenNames.CLOCK]: {
    screen: ClockScreen,
    navigationOptions: () => ({
      headerLeft: <Text style={styles.headerLeft}>Clock</Text>,
      headerRight: <CustomButton iconProps={{ name: icons.SETTINGS, color: '#000' }} viewStyle={styles.headerRight} />
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

export default createAppContainer(AppStack);

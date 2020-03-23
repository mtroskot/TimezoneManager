import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ClockScreen from 'src/screens/Clock';
import { CustomButton } from 'src/components';
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

const AppStack = createStackNavigator(
  {
    [stackNames.CLOCK_STACK]: ClockStack
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);

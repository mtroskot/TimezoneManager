import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from 'src/constants/navigation';
import ClockScreen from 'src/screens/Clock';
import { Text } from 'react-native';
import styles from 'src/navigation/styles';
import { CustomButton } from 'src/components';
import { icons } from 'src/constants/icons';
import { NavigationService } from 'src/services';
import AddNewTimezoneScreen from 'src/screens/AddNewTimezone';
import SearchScreen from 'src/screens/Search';

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
  [screenNames.SEARCH]: {
    screen: SearchScreen
  }
});

export default ClockStack;

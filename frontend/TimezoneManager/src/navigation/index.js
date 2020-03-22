import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ClockScreen from 'src/screens/Clock';
import { screenNames, stackNames } from 'src/constants/navigation';

const ClockStack = createStackNavigator(
  {
    [screenNames.CLOCK]: {
      screen: ClockScreen
    }
  },
  {
    headerMode: 'none'
  }
);

const AppStack = createStackNavigator(
  {
    [stackNames.CLOCK_STACK]: ClockStack
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);

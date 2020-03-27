import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { stackNames } from 'src/constants/navigation';
import AuthStack from 'src/navigation/AuthStack';
import ClockStack from 'src/navigation/ClockStack';
import AuthLoadingScreen from 'src/screens/AuthLoading';

const AppStack = createSwitchNavigator(
  {
    [stackNames.AUTH_LOADING_STACK]: AuthLoadingScreen,
    [stackNames.AUTH_STACK]: AuthStack,
    [stackNames.CLOCK_STACK]: ClockStack
  },
  {
    initialRouteName: stackNames.AUTH_LOADING_STACK,
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);

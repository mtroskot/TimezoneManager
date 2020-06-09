import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthStack from 'src/navigation/AuthStack';
import ClockStack from 'src/navigation/ClockStack';
import AuthLoadingScreen from 'src/screens/AuthLoading';
import { eStackNames } from 'src/types/navigation';

const AppStack = createSwitchNavigator(
  {
    [eStackNames.AUTH_LOADING_STACK]: AuthLoadingScreen,
    [eStackNames.AUTH_STACK]: AuthStack,
    [eStackNames.CLOCK_STACK]: ClockStack
  },
  {
    initialRouteName: eStackNames.AUTH_LOADING_STACK,
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);

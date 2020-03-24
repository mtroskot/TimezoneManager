import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideDrawer from 'src/screens/SideDrawer';
import { stackNames } from 'src/constants/navigation';
import AuthStack from 'src/navigation/AuthStack';
import ClockStack from 'src/navigation/ClockStack';

const AppStack = createStackNavigator(
  {
    [stackNames.AUTH_STACK]: AuthStack,
    [stackNames.CLOCK_STACK]: ClockStack
  },
  {
    initialRouteName: stackNames.CLOCK_STACK,
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

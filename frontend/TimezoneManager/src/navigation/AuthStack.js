import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from 'src/constants/navigation';
import AuthScreen from 'src/screens/Auth';

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

export default AuthStack;

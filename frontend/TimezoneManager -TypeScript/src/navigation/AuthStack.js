import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from 'src/screens/Auth';
import { eScreenNames } from 'src/types/navigation';

const AuthStack = createStackNavigator(
  {
    [eScreenNames.AUTH]: {
      screen: AuthScreen
    }
  },
  {
    headerMode: 'none'
  }
);

export default AuthStack;

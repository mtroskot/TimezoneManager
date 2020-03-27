import React from 'react';
import { View } from 'react-native';
import { Loader } from 'src/components';
import { useDispatch } from 'react-redux';
import { authAutoSignIn } from 'src/store/user/userActions';

const AuthLoading = props => {
  const dispatch = useDispatch();
  //when calling navigate from NavigationService the navigatorRef is not set yet,
  // that's why the navigation is explicitly passed
  dispatch(authAutoSignIn(props.navigation));

  return (
    <View>
      <Loader />
    </View>
  );
};

export default AuthLoading;

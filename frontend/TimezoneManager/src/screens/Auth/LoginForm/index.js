import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';

const LoginForm = ({ loginForm, handleInput, handleLogin, isLoading }) => {
  const textInputRef = useRef(null);
  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={loginStyles.headerText}>Welcome Back</Text>
      </View>
      <FloatingLabelTextInput
        value={loginForm.email}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'email')}
        onSubmitEditing={() => textInputRef.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef}
        floatingLabel={'Password'}
        value={loginForm.password}
        secureTextEntry
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={value => handleInput(value, 'password')}
        onSubmitEditing={handleLogin}
      />
      <CustomButton
        onPress={handleLogin}
        isLoading={isLoading}
        text={'Login'}
        tOpacityStyle={loginStyles.submitButton}
        textStyle={[loginStyles.loginButtonText]}
      />
    </View>
  );
};

LoginForm.propTypes = {
  loginForm: PropTypes.exact({
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default React.memo(LoginForm);
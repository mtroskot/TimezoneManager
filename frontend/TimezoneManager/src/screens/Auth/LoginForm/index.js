import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';

const LoginForm = ({ loginForm, handleInput, handleLogin, isLoading }) => {
  const textInputRef = useRef(null);
  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>Welcome Back</Text>
      </View>
      <FloatingLabelTextInput
        value={loginForm.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'emailAddress')}
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
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

LoginForm.propTypes = {
  loginForm: PropTypes.exact({
    emailAddress: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default React.memo(LoginForm);

import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { errorPropTypes } from 'src/constants/propTypes';

const LoginForm = ({ loginForm, errors, handleInput, handleLogin, isLoading }) => {
  const textInputRef = useRef(null);
  const { emailAddress, password } = loginForm;
  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>Welcome Back</Text>
      </View>
      <FloatingLabelTextInput
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef}
        value={password}
        error={errors.password}
        floatingLabel={'Password'}
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
  errors: PropTypes.objectOf(errorPropTypes).isRequired,
  loginForm: PropTypes.exact({
    emailAddress: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default React.memo(LoginForm);

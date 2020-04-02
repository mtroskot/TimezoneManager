import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { errorPropTypes } from 'src/constants/propTypes';
import { authScreenTestIDs } from 'src/constants/testIDs';

const LoginForm = ({
  loginForm,
  errors,
  handleInput,
  handleLogin,
  isLoading,
  headerText,
  submitButtonText,
  submitButtonTestID
}) => {
  const textInputRef = useRef(null);
  const { emailAddress, password } = loginForm;
  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>{headerText}</Text>
      </View>
      <FloatingLabelTextInput
        testID={authScreenTestIDs.LOGIN_EMAIL_INPUT}
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef.current.focus()}
      />
      <FloatingLabelTextInput
        testID={authScreenTestIDs.LOGIN_PASSWORD_INPUT}
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
        testID={submitButtonTestID}
        onPress={handleLogin}
        isLoading={isLoading}
        loaderStyle={[appStyles.submitButton, { backgroundColor: 'transparent' }]}
        text={submitButtonText}
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

LoginForm.propTypes = {
  errors: PropTypes.objectOf(errorPropTypes).isRequired,
  headerText: PropTypes.string.isRequired,
  loginForm: PropTypes.exact({
    emailAddress: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  submitButtonTestID: PropTypes.string.isRequired
};

export default React.memo(LoginForm);

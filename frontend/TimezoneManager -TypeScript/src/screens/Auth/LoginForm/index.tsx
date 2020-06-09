import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { iValidationErrors } from 'src/types/interfaces';
import { eAuthScreenTestIDs } from 'src/types/enums';

interface Props {
  errors: iValidationErrors;
  headerText: string;
  loginForm: {
    emailAddress: string;
    password: string;
  };
  handleInput: (value: string, field: string) => void;
  handleLogin: () => void;
  isLoading: boolean;
  submitButtonText: string;
  submitButtonTestID: string;
}

const LoginForm: React.FC<Props> = ({
  loginForm,
  errors,
  handleInput,
  handleLogin,
  isLoading,
  headerText,
  submitButtonText,
  submitButtonTestID
}) => {
  const textInputRef = useRef<TextInput>(null);
  const { emailAddress, password } = loginForm;
  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>{headerText}</Text>
      </View>
      <FloatingLabelTextInput
        testID={eAuthScreenTestIDs.LOGIN_EMAIL_INPUT}
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={(value: string) => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef?.current?.focus()}
      />
      <FloatingLabelTextInput
        testID={eAuthScreenTestIDs.LOGIN_PASSWORD_INPUT}
        textInputRef={textInputRef}
        value={password}
        error={errors.password}
        floatingLabel={'Password'}
        secureTextEntry
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={(value: string) => handleInput(value, 'password')}
        onSubmitEditing={handleLogin}
      />
      <CustomButton
        testID={submitButtonTestID}
        onPress={handleLogin}
        isLoading={isLoading}
        loaderStyle={StyleSheet.flatten([appStyles.submitButton, { backgroundColor: 'transparent' }])}
        text={submitButtonText}
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

export default React.memo(LoginForm);

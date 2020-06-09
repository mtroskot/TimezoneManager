import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { iRegisterUserForm, iValidationErrors } from 'src/types/interfaces';
import { eAuthScreenTestIDs } from 'src/types/enums';

interface Props {
  submitButtonText: string;
  headerText: string;
  registerForm: iRegisterUserForm;
  errors: iValidationErrors;
  handleInput: (value: string, field: string) => void;
  handleUserFormSubmit: () => void;
  isLoading: boolean;
  isEdit: boolean;
  submitButtonTestID: string;
}

const RegisterForm: React.FC<Props> = ({
  submitButtonText,
  headerText,
  registerForm,
  errors,
  handleInput,
  handleUserFormSubmit,
  isLoading,
  isEdit,
  submitButtonTestID
}) => {
  const textInputRef1 = useRef<TextInput>(null);
  const textInputRef2 = useRef<TextInput>(null);
  const textInputRef3 = useRef<TextInput>(null);
  const textInputRef4 = useRef<TextInput>(null);
  const { firstName, lastName, emailAddress, password, matchingPassword } = registerForm;

  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>{headerText}</Text>
      </View>
      <View style={loginStyles.formContainer}>
        <FloatingLabelTextInput
          customContainerStyle={loginStyles.firstNameInputView}
          testID={eAuthScreenTestIDs.FIRST_NAME_INPUT}
          value={firstName}
          error={errors.firstName}
          floatingLabel={'First Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={(value: string) => handleInput(value, 'firstName')}
          onSubmitEditing={() => textInputRef1?.current?.focus()}
        />
        <FloatingLabelTextInput
          textInputRef={textInputRef1}
          customContainerStyle={loginStyles.lastNameInputView}
          testID={eAuthScreenTestIDs.LAST_NAME_INPUT}
          value={lastName}
          error={errors.lastName}
          floatingLabel={'Last Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={(value: string) => handleInput(value, 'lastName')}
          onSubmitEditing={() => textInputRef2?.current?.focus()}
        />
      </View>
      <FloatingLabelTextInput
        textInputRef={textInputRef2}
        testID={eAuthScreenTestIDs.EMAIL_INPUT}
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={isEdit ? 'go' : 'next'}
        onChangeText={(value: string) => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef3?.current?.focus()}
      />
      {!isEdit && (
        <>
          <FloatingLabelTextInput
            textInputRef={textInputRef3}
            testID={eAuthScreenTestIDs.PASSWORD_INPUT}
            floatingLabel={'Password'}
            value={password}
            error={errors.password}
            secureTextEntry
            placeholderTextColor="#949EA0"
            returnKeyType={'next'}
            onChangeText={(value: string) => handleInput(value, 'password')}
            onSubmitEditing={() => textInputRef4?.current?.focus()}
          />
          <FloatingLabelTextInput
            textInputRef={textInputRef4}
            testID={eAuthScreenTestIDs.MATCHING_PASSWORD_INPUT}
            floatingLabel={'Matching Password'}
            value={matchingPassword}
            error={errors.matchingPassword}
            secureTextEntry
            placeholderTextColor="#949EA0"
            returnKeyType={'go'}
            onChangeText={(value: string) => handleInput(value, 'matchingPassword')}
            onSubmitEditing={handleUserFormSubmit}
          />
        </>
      )}
      <CustomButton
        testID={submitButtonTestID}
        onPress={handleUserFormSubmit}
        isLoading={isLoading}
        loaderStyle={StyleSheet.flatten([appStyles.submitButton, { backgroundColor: 'transparent' }])}
        text={submitButtonText}
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

export default React.memo(RegisterForm);

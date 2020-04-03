import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import PropTypes from 'prop-types';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { errorPropTypes } from 'src/constants/propTypes';
import { authScreenTestIDs } from 'src/constants/testIDs';

const RegisterForm = ({
  submitButtonText,
  headerText,
  registerForm,
  errors,
  handleInput,
  handleRegister,
  isLoading,
  isEdit,
  submitButtonTestID
}) => {
  const textInputRef1 = useRef(null);
  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  const textInputRef4 = useRef(null);
  const { firstName, lastName, emailAddress, password, matchingPassword } = registerForm;

  return (
    <View>
      <View style={loginStyles.headerView}>
        <Text style={appStyles.headerText}>{headerText}</Text>
      </View>
      <View style={loginStyles.formContainer}>
        <FloatingLabelTextInput
          customContainerStyle={loginStyles.firstNameInputView}
          testID={authScreenTestIDs.FIRST_NAME_INPUT}
          value={firstName}
          error={errors.firstName}
          floatingLabel={'First Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={value => handleInput(value, 'firstName')}
          onSubmitEditing={() => textInputRef1.current.focus()}
        />
        <FloatingLabelTextInput
          textInputRef={textInputRef1}
          customContainerStyle={loginStyles.lastNameInputView}
          testID={authScreenTestIDs.LAST_NAME_INPUT}
          value={lastName}
          error={errors.lastName}
          floatingLabel={'Last Name'}
          placeholderTextColor="#949EA0"
          returnKeyType={'next'}
          autoCapitalize={'words'}
          onChangeText={value => handleInput(value, 'lastName')}
          onSubmitEditing={() => textInputRef2.current.focus()}
        />
      </View>
      <FloatingLabelTextInput
        textInputRef={textInputRef2}
        testID={authScreenTestIDs.EMAIL_INPUT}
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={isEdit ? 'go' : 'next'}
        onChangeText={value => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef3.current.focus()}
      />
      {!isEdit && (
        <>
          <FloatingLabelTextInput
            textInputRef={textInputRef3}
            testID={authScreenTestIDs.PASSWORD_INPUT}
            floatingLabel={'Password'}
            value={password}
            error={errors.password}
            secureTextEntry
            placeholderTextColor="#949EA0"
            returnKeyType={'next'}
            onChangeText={value => handleInput(value, 'password')}
            onSubmitEditing={() => textInputRef4.current.focus()}
          />
          <FloatingLabelTextInput
            textInputRef={textInputRef4}
            testID={authScreenTestIDs.MATCHING_PASSWORD_INPUT}
            floatingLabel={'Matching Password'}
            value={matchingPassword}
            error={errors.matchingPassword}
            secureTextEntry
            placeholderTextColor="#949EA0"
            returnKeyType={'go'}
            onChangeText={value => handleInput(value, 'matchingPassword')}
            onSubmitEditing={handleRegister}
          />
        </>
      )}
      <CustomButton
        testID={submitButtonTestID}
        onPress={handleRegister}
        isLoading={isLoading}
        loaderStyle={[appStyles.submitButton, { backgroundColor: 'transparent' }]}
        text={submitButtonText}
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  errors: PropTypes.objectOf(errorPropTypes).isRequired,
  submitButtonText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  registerForm: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailAddress: PropTypes.string,
    password: PropTypes.string,
    matchingPassword: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  submitButtonTestID: PropTypes.string.isRequired
};

export default React.memo(RegisterForm);

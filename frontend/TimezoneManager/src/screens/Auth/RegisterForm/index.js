import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import PropTypes from 'prop-types';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';
import { errorPropTypes } from 'src/constants/propTypes';

const RegisterForm = ({
  submitButtonText,
  headerText,
  registerForm,
  errors,
  handleInput,
  handleRegister,
  isLoading,
  isEdit
}) => {
  const textInputRef1 = useRef(null);
  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  const textInputRef4 = useRef(null);
  const { firstName, lastName, emailAddress, password, matchingPassword } = registerForm;

  return (
    <View>
      <View style={loginStyles.headerView} bounces={false}>
        <Text style={appStyles.headerText}>{headerText}</Text>
      </View>
      <View style={loginStyles.formContainer}>
        <FloatingLabelTextInput
          customContainerStyle={loginStyles.firstNameInputView}
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
        value={emailAddress}
        error={errors.emailAddress}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'emailAddress')}
        onSubmitEditing={() => textInputRef3.current.focus()}
      />
      {!isEdit && (
        <>
          <FloatingLabelTextInput
            textInputRef={textInputRef3}
            floatingLabel={'Password'}
            value={password}
            error={errors.password}
            secureTextEntry
            placeholderTextColor="#949EA0"
            returnKeyType={'go'}
            onChangeText={value => handleInput(value, 'password')}
            onSubmitEditing={() => textInputRef4.current.focus()}
          />
          <FloatingLabelTextInput
            textInputRef={textInputRef4}
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
        onPress={handleRegister}
        isLoading={isLoading}
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
  isEdit: PropTypes.bool.isRequired
};

export default React.memo(RegisterForm);

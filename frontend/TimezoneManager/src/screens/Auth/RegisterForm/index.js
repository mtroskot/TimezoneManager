import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { CustomButton, FloatingLabelTextInput } from 'src/components';
import PropTypes from 'prop-types';
import loginStyles from 'src/screens/Auth/styles';
import appStyles from 'src/styles/appStyles';

const RegisterForm = ({ registerForm, handleInput, handleRegister, isLoading }) => {
  const textInputRef1 = useRef(null);
  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  return (
    <View>
      <View style={loginStyles.headerView} bounces={false}>
        <Text style={appStyles.headerText}>Create an Account</Text>
      </View>
      <View style={loginStyles.formContainer}>
        <FloatingLabelTextInput
          customContainerStyle={loginStyles.firstNameInputView}
          value={registerForm.firstName}
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
          value={registerForm.lastName}
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
        value={registerForm.email}
        floatingLabel={'Email Address'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'email')}
        onSubmitEditing={() => textInputRef3.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef3}
        floatingLabel={'Password'}
        value={registerForm.password}
        secureTextEntry
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={value => handleInput(value, 'password')}
        onSubmitEditing={handleRegister}
      />
      <CustomButton
        onPress={handleRegister}
        isLoading={isLoading}
        text={'Create Account'}
        tOpacityStyle={appStyles.submitButton}
        textStyle={appStyles.buttonText}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  registerForm: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default React.memo(RegisterForm);

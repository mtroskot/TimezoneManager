import React, { useState } from 'react';
import { Text, View } from 'react-native';
import LoginForm from 'src/screens/Auth/LoginForm';
import RegisterForm from 'src/screens/Auth/RegisterForm';
import styles from 'src/screens/Auth/styles';
import { CustomButton, KeyboardAvoidAndDismissView } from 'src/components';
import SafeAreaView from 'react-native-safe-area-view';
import { screenNames } from 'src/constants/navigation';
import NavigationService from 'src/services/navigation';

const initialRegisterFormState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: ''
};

const initialLoginFormState = {
  email: '',
  password: ''
};

const Auth = () => {
  const [loginForm, setLoginForm] = useState(initialLoginFormState);
  const [registerForm, setRegisterForm] = useState(initialRegisterFormState);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterInput(value, fieldName) {
    setRegisterForm({ ...registerForm, [fieldName]: value });
  }

  function handleLoginInput(value, fieldName) {
    setLoginForm({ ...loginForm, [fieldName]: value });
  }

  function handleLogin() {
    const { email, password } = loginForm;
    if (email.toLowerCase() === 'test' && password === 'test') {
      NavigationService.navigate(screenNames.CLOCK);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  function handleRegister() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  function onSwitchForm() {
    setShowLoginForm(!showLoginForm);
    setRegisterForm(initialRegisterFormState);
    setLoginForm(initialLoginFormState);
  }

  //RENDER
  const form = showLoginForm ? (
    <LoginForm {...{ loginForm, handleInput: handleLoginInput, handleLogin, isLoading }} />
  ) : (
    <RegisterForm {...{ registerForm, handleInput: handleRegisterInput, handleRegister, isLoading }} />
  );
  const switchFormText = showLoginForm ? `Don't have an account?` : `Already have an account?`;
  const switchFormButtonText = !showLoginForm ? 'Login' : 'Create Account';
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidAndDismissView viewStyle={styles.container} behavior={''}>
        {form}
        <View style={styles.switchFormContainer}>
          <Text style={styles.switchFormText}>{switchFormText}</Text>
          <CustomButton
            onPress={onSwitchForm}
            text={switchFormButtonText}
            textStyle={[styles.loginButtonText, { color: '#EAA79E' }]}
          />
        </View>
      </KeyboardAvoidAndDismissView>
    </SafeAreaView>
  );
};

Auth.propTypes = {};

export default React.memo(Auth);

import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import LoginForm from 'src/screens/Auth/LoginForm';
import RegisterForm from 'src/screens/Auth/RegisterForm';
import styles from 'src/screens/Auth/styles';
import { CustomButton, KeyboardAvoidAndDismissView } from 'src/components';
import SafeAreaView from 'react-native-safe-area-view';
import { screenNames } from 'src/constants/navigation';
import NavigationService from 'src/services/navigation';
import appStyles from 'src/styles/appStyles';

const initialRegisterFormState = {
  id: null,
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: ''
};

const initialLoginFormState = {
  emailAddress: '',
  password: ''
};

function mapUserData(isEdit, userForEdit) {
  let mappedState = { ...initialRegisterFormState };
  if (isEdit) {
    mappedState.id = userForEdit.id;
    mappedState.firstName = userForEdit.firstName;
    mappedState.lastName = userForEdit.lastName;
    mappedState.emailAddress = userForEdit.emailAddress;
    mappedState.password = userForEdit.password;
  }
  return mappedState;
}

const Auth = props => {
  const isEdit = NavigationService.getCurrentScreenName() === screenNames.AUTH_EDIT;
  const userForEdit = props.navigation.getParam('user');
  const registerInitialState = useMemo(() => mapUserData(isEdit, userForEdit), [isEdit, userForEdit]);
  const [loginForm, setLoginForm] = useState(initialLoginFormState);
  const [registerForm, setRegisterForm] = useState(registerInitialState);
  const [showLoginForm, setShowLoginForm] = useState(true && !isEdit);
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterInput(value, fieldName) {
    setRegisterForm({ ...registerForm, [fieldName]: value });
  }

  function handleLoginInput(value, fieldName) {
    setLoginForm({ ...loginForm, [fieldName]: value });
  }

  function handleLogin() {
    const { emailAddress, password } = loginForm;
    if (emailAddress.toLowerCase() === 'test' && password === 'test') {
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
  const registerHeaderText = isEdit ? 'Update user account' : 'Create an Account';
  const registerSubmitText = isEdit ? 'Update Account' : 'Create Account';
  const form = showLoginForm ? (
    <LoginForm {...{ loginForm, handleInput: handleLoginInput, handleLogin, isLoading }} />
  ) : (
    <RegisterForm
      {...{
        headerText: registerHeaderText,
        submitButtonText: registerSubmitText,
        registerForm,
        handleInput: handleRegisterInput,
        handleRegister,
        isLoading
      }}
    />
  );
  const switchFormText = showLoginForm ? "Don't have an account?" : 'Already have an account?';
  const switchFormButtonText = !showLoginForm ? 'Login' : 'Create Account';
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <KeyboardAvoidAndDismissView viewStyle={styles.container} behavior={''}>
        {form}
        {!isLoading && !isEdit && (
          <View style={styles.switchFormContainer}>
            <Text style={styles.switchFormText}>{switchFormText}</Text>
            <CustomButton
              onPress={onSwitchForm}
              text={switchFormButtonText}
              textStyle={[appStyles.buttonText, { color: '#EAA79E' }]}
            />
          </View>
        )}
      </KeyboardAvoidAndDismissView>
    </SafeAreaView>
  );
};

Auth.propTypes = {};

export default React.memo(Auth);

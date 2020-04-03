import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import LoginForm from 'src/screens/Auth/LoginForm';
import RegisterForm from 'src/screens/Auth/RegisterForm';
import { CustomButton } from 'src/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { authenticateUser, registerUser, updateUserInfo } from 'src/store/user/userActions';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { userActionTypes } from 'src/constants/actionTypes';
import { ValidationUtils } from 'src/utils';
import { screenNames } from 'src/constants/navigation';
import PropTypes from 'prop-types';
import { authScreenTestIDs } from 'src/constants/testIDs';
import { authScreenText } from 'src/constants/text';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Auth/styles';

const initialRegisterFormState = Object.freeze({
  id: null,
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  matchingPassword: ''
});

const initialLoginFormState = Object.freeze({
  emailAddress: '',
  password: ''
});

function mapUserData(isEdit, userForEdit) {
  let mappedState = { ...initialRegisterFormState };
  if (isEdit) {
    mappedState.id = userForEdit.id;
    mappedState.firstName = userForEdit.firstName;
    mappedState.lastName = userForEdit.lastName;
    mappedState.emailAddress = userForEdit.emailAddress;
    mappedState.password = '';
    mappedState.matchingPassword = '';
  }
  return mappedState;
}

const Auth = props => {
  //STATE
  const { isLoading, navigation } = props;
  const isEdit = navigation.state.routeName === screenNames.AUTH_EDIT;
  const userForEdit = props.navigation.getParam('user');
  const registerInitialState = useMemo(() => mapUserData(isEdit, userForEdit), [isEdit, userForEdit]);
  const [loginForm, setLoginForm] = useState(initialLoginFormState);
  const [registerForm, setRegisterForm] = useState(registerInitialState);
  const [errors, setErrors] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(true && !isEdit);

  //METHODS
  function handleRegisterInput(value, fieldName) {
    setRegisterForm({ ...registerForm, [fieldName]: value });
  }

  function handleLoginInput(value, fieldName) {
    setLoginForm({ ...loginForm, [fieldName]: value });
  }

  function handleLogin() {
    if (validateLoginForm()) {
      const { emailAddress, password } = loginForm;
      props.authenticateUser(emailAddress, password);
    }
  }

  function handleRegister() {
    const validateAllFields = !isEdit;
    if (validateRegisterForm(validateAllFields)) {
      if (isEdit) {
        const { id, firstName, lastName, emailAddress } = registerForm;
        props.updateUserInfo({ id, firstName, lastName, emailAddress });
      } else {
        props.registerUser(registerForm);
      }
    }
  }

  function validateRegisterForm(validateAllFields) {
    const { firstName, lastName, emailAddress, password, matchingPassword } = registerForm;
    const errorObject = {};
    const isFirstNameValid = ValidationUtils.validate('firstName', errorObject, ValidationUtils.isValidName(firstName));
    const isLastNameValid = ValidationUtils.validate('lastName', errorObject, ValidationUtils.isValidName(lastName));
    const isEmailValid = ValidationUtils.validate(
      'emailAddress',
      errorObject,
      ValidationUtils.isValidEmail(emailAddress)
    );
    let isPasswordValid = true;
    let isMatchingPasswordValid = true;
    if (validateAllFields) {
      isPasswordValid = ValidationUtils.validate('password', errorObject, ValidationUtils.isValidPassword(password));
      isMatchingPasswordValid = ValidationUtils.validate(
        'matchingPassword',
        errorObject,
        ValidationUtils.isValidMatchingPassword(password, matchingPassword)
      );
    }
    setErrors(errorObject);
    return isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isMatchingPasswordValid;
  }

  function validateLoginForm() {
    const { emailAddress, password } = loginForm;
    const errorObject = {};
    const isEmailValid = ValidationUtils.validate(
      'emailAddress',
      errorObject,
      ValidationUtils.isValidEmail(emailAddress)
    );
    const isPasswordValid = ValidationUtils.validate(
      'password',
      errorObject,
      ValidationUtils.isValidPassword(password)
    );
    setErrors(errorObject);
    return isEmailValid && isPasswordValid;
  }

  function onSwitchForm() {
    setShowLoginForm(!showLoginForm);
    setErrors({});
    setRegisterForm(initialRegisterFormState);
    setLoginForm(initialLoginFormState);
  }

  //RENDER
  const registerHeaderText = isEdit ? authScreenText.UPDATE_HEADER : authScreenText.REGISTER_HEADER;
  const registerSubmitText = isEdit ? authScreenText.UPDATE_ACCOUNT : authScreenText.CREATE_ACCOUNT;
  const registerUpdateButtonTestID = isEdit ? authScreenTestIDs.SUBMIT_USER_UPDATE : authScreenTestIDs.SUBMIT_REGISTER;
  const form = showLoginForm ? (
    <LoginForm
      {...{
        loginForm,
        headerText: authScreenText.LOGIN_HEADER,
        errors,
        handleInput: handleLoginInput,
        handleLogin,
        isLoading,
        submitButtonText: authScreenText.LOGIN,
        submitButtonTestID: authScreenTestIDs.SUBMIT_LOGIN
      }}
    />
  ) : (
    <RegisterForm
      {...{
        headerText: registerHeaderText,
        submitButtonText: registerSubmitText,
        registerForm,
        errors,
        isEdit,
        handleInput: handleRegisterInput,
        handleRegister,
        isLoading,
        submitButtonTestID: registerUpdateButtonTestID
      }}
    />
  );
  const switchFormText = showLoginForm ? authScreenText.SWITCH_TO_REGISTER : authScreenText.SWITCH_TO_LOGIN;
  const switchFormButtonText = !showLoginForm ? authScreenText.LOGIN : authScreenText.CREATE_ACCOUNT;
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        {form}
        {!isLoading && !isEdit && (
          <View style={styles.switchFormContainer}>
            <Text style={styles.switchFormText}>{switchFormText}</Text>
            <CustomButton
              testID={authScreenTestIDs.SWITCH_FORM}
              onPress={onSwitchForm}
              text={switchFormButtonText}
              textStyle={[appStyles.buttonText, { color: '#EAA79E' }]}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

Auth.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  authenticateUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: checkIfLoadingSelector(state)([
    userActionTypes.AUTH_USER,
    userActionTypes.REGISTER_USER,
    userActionTypes.UPDATE_USER_INFO
  ])
});

const mapDispatchToProps = {
  authenticateUser,
  registerUser,
  updateUserInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Auth));

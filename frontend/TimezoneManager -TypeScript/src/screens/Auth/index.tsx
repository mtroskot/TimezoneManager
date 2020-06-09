import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import LoginForm from 'src/screens/Auth/LoginForm';
import RegisterForm from 'src/screens/Auth/RegisterForm';
import { CustomButton } from 'src/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { authenticateUser, registerUser, updateUserInfo } from 'src/store/user/userActions';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { ValidationUtils } from 'src/utils';
import appStyles from 'src/styles/appStyles';
import styles from 'src/screens/Auth/styles';
import { StoreState } from '../../store/rootReducer';
import { UserActionTypes } from '../../types/store/actionTypes';
import { eAuthScreenTestIDs, eAuthScreenText } from '../../types/enums';
import { eScreenNames } from '../../types/navigation';
import { iEditUserForm, iLoginForm, iRegisterUserForm, iUserForEdit, iValidationErrors } from '../../types/interfaces';
import { NavigationStackScreenProps } from 'react-navigation-stack';

const initialRegisterFormState: iRegisterUserForm = Object.freeze({
  id: null,
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  matchingPassword: ''
});

const initialLoginFormState: iLoginForm = Object.freeze({
  emailAddress: '',
  password: ''
});

function mapUserData(
  isEdit: boolean,
  initialRegisterFormState: iRegisterUserForm,
  userForEdit: iUserForEdit | undefined
): iRegisterUserForm | iEditUserForm {
  const mappedState = { ...initialRegisterFormState } as iEditUserForm;
  if (isEdit && userForEdit) {
    mappedState.id = userForEdit.id;
    mappedState.firstName = userForEdit.firstName;
    mappedState.lastName = userForEdit.lastName;
    mappedState.emailAddress = userForEdit.emailAddress;
    mappedState.password = '';
    mappedState.matchingPassword = '';
    return mappedState;
  }
  return mappedState as iRegisterUserForm;
}

interface Props extends NavigationStackScreenProps {
  isLoading: boolean;
  authenticateUser: typeof authenticateUser;
  registerUser: typeof registerUser;
  updateUserInfo: typeof updateUserInfo;
}

const Auth: React.FC<Props> = (props) => {
  //STATE
  const { isLoading, navigation } = props;
  const userForEdit = props.navigation.getParam('user');
  const isEdit: boolean = navigation.state.routeName === eScreenNames.AUTH_EDIT;
  const [loginForm, setLoginForm] = useState<iLoginForm>(initialLoginFormState);
  const [registerForm, setRegisterForm] = useState<iRegisterUserForm | iEditUserForm>(() => {
    return mapUserData(isEdit, initialRegisterFormState, userForEdit);
  });
  const [errors, setErrors] = useState<iValidationErrors>({});
  const [showLoginForm, setShowLoginForm] = useState(!isEdit);

  //METHODS
  function handleRegisterInput(value: string, fieldName: string): void {
    setRegisterForm({ ...registerForm, [fieldName]: value });
  }

  function handleLoginInput(value: string, fieldName: string): void {
    setLoginForm({ ...loginForm, [fieldName]: value });
  }

  function handleLogin(): void {
    if (validateLoginForm()) {
      const { emailAddress, password } = loginForm;
      props.authenticateUser(emailAddress, password);
    }
  }

  function handleUserFormSubmit(): void {
    const validateAllFields = !isEdit;
    if (validateRegisterForm(validateAllFields)) {
      if (isEdit) {
        const { id, firstName, lastName, emailAddress } = registerForm as iEditUserForm;
        props.updateUserInfo({ id, firstName, lastName, emailAddress });
      } else {
        props.registerUser(registerForm);
      }
    }
  }

  function validateRegisterForm(validateAllFields: boolean): boolean {
    const { firstName, lastName, emailAddress, password, matchingPassword } = registerForm;
    const errorObject = {};
    const isFirstNameValid = ValidationUtils.validate('firstName', errorObject, ValidationUtils.isValidName(firstName));
    const isLastNameValid = ValidationUtils.validate('lastName', errorObject, ValidationUtils.isValidName(lastName));
    const isEmailValid = ValidationUtils.validate('emailAddress', errorObject, ValidationUtils.isValidEmail(emailAddress));
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

  function validateLoginForm(): boolean {
    const { emailAddress, password } = loginForm;
    const errorObject = {};
    const isEmailValid = ValidationUtils.validate('emailAddress', errorObject, ValidationUtils.isValidEmail(emailAddress));
    const isPasswordValid = ValidationUtils.validate('password', errorObject, ValidationUtils.isValidPassword(password));
    setErrors(errorObject);
    return isEmailValid && isPasswordValid;
  }

  /**
   * Switches between Login form and Register form
   */
  function onSwitchForm(): void {
    setShowLoginForm(!showLoginForm);
    setErrors({});
    setRegisterForm(initialRegisterFormState);
    setLoginForm(initialLoginFormState);
  }

  //RENDER
  const registerHeaderText = isEdit ? eAuthScreenText.UPDATE_HEADER : eAuthScreenText.REGISTER_HEADER;
  const registerSubmitText = isEdit ? eAuthScreenText.UPDATE_ACCOUNT : eAuthScreenText.CREATE_ACCOUNT;
  const registerUpdateButtonTestID = isEdit ? eAuthScreenTestIDs.SUBMIT_USER_UPDATE : eAuthScreenTestIDs.SUBMIT_REGISTER;
  const form = showLoginForm ? (
    <LoginForm
      {...{
        loginForm,
        headerText: eAuthScreenText.LOGIN_HEADER,
        errors,
        handleInput: handleLoginInput,
        handleLogin,
        isLoading,
        submitButtonText: eAuthScreenText.LOGIN,
        submitButtonTestID: eAuthScreenTestIDs.SUBMIT_LOGIN
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
        handleUserFormSubmit,
        isLoading,
        submitButtonTestID: registerUpdateButtonTestID
      }}
    />
  );
  const switchFormText = showLoginForm ? eAuthScreenText.SWITCH_TO_REGISTER : eAuthScreenText.SWITCH_TO_LOGIN;
  const switchFormButtonText = !showLoginForm ? eAuthScreenText.LOGIN : eAuthScreenText.CREATE_ACCOUNT;
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        {form}
        {!isLoading && !isEdit && (
          <View style={styles.switchFormContainer}>
            <Text style={styles.switchFormText}>{switchFormText}</Text>
            <CustomButton
              testID={eAuthScreenTestIDs.SWITCH_FORM}
              onPress={onSwitchForm}
              text={switchFormButtonText}
              textStyle={StyleSheet.flatten([appStyles.buttonText, { color: '#EAA79E' }])}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isLoading: checkIfLoadingSelector(state)([UserActionTypes.AUTH_USER, UserActionTypes.REGISTER_USER, UserActionTypes.UPDATE_USER_INFO])
});

const mapDispatchToProps = {
  authenticateUser,
  registerUser,
  updateUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Auth));

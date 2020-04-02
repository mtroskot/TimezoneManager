/*eslint-disable*/
import { authScreenTestIDs } from '../src/constants/testIDs';
import { authScreenText } from '../src/constants/text';

describe('AuthScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('submitting empty login and register form', async () => {
    //LOGIN FORM
    await expect(element(by.label(authScreenText.LOGIN_HEADER))).toBeVisible();
    await expect(element(by.id(authScreenTestIDs.SUBMIT_LOGIN))).toBeVisible();
    await expect(element(by.label(authScreenText.SWITCH_TO_REGISTER))).toBeVisible();
    await expect(element(by.id(authScreenTestIDs.SWITCH_FORM))).toBeVisible();
    //switch to register form
    await element(by.id(authScreenTestIDs.SWITCH_FORM)).tap();
    //REGISTER FORM
    await expect(element(by.label(authScreenText.REGISTER_HEADER))).toBeVisible();
    await expect(element(by.id(authScreenTestIDs.SUBMIT_REGISTER))).toBeVisible();
    await expect(element(by.label(authScreenText.SWITCH_TO_LOGIN))).toBeVisible();
    await expect(element(by.id(authScreenTestIDs.SWITCH_FORM))).toBeVisible();
    //submit empty form
    await element(by.id(authScreenTestIDs.SUBMIT_REGISTER)).tap();
    //assert error fields
    await expect(element(by.label('First Name is invalid'))).toBeVisible();
    await expect(element(by.label('Last Name is invalid'))).toBeVisible();
    await expect(element(by.label('Email Address is invalid'))).toBeVisible();
    await expect(element(by.label('Password is invalid'))).toBeVisible();
    await expect(element(by.label('Matching Password is invalid'))).toBeVisible();
    //switch to login form
    await element(by.id(authScreenTestIDs.SWITCH_FORM)).tap();
    //submit empty login form
    await element(by.id(authScreenTestIDs.SUBMIT_LOGIN)).tap();
    //assert error fields
    await expect(element(by.label('Email Address is invalid'))).toBeVisible();
    await expect(element(by.label('Password is invalid'))).toBeVisible();
  });

  // it('registration flow', async () => {
  //   await element(by.id(authScreenTestIDs.SWITCH_FORM)).tap();
  //
  //   await element(by.id(authScreenTestIDs.FIRST_NAME_INPUT)).tap();
  //   await element(by.id(authScreenTestIDs.FIRST_NAME_INPUT)).typeText('Marko');
  //   await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).tap();
  //   await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).typeText('Troskot');
  //   await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).tapReturnKey();
  //   await element(by.id(authScreenTestIDs.EMAIL_INPUT)).typeText('marko@gmail.com');
  //   await element(by.id(authScreenTestIDs.MATCHING_PASSWORD_INPUT)).tap();
  //   await element(by.id(authScreenTestIDs.MATCHING_PASSWORD_INPUT)).typeText('123456');
  //   await element(by.id(authScreenTestIDs.PASSWORD_INPUT)).tap();
  //   await element(by.id(authScreenTestIDs.PASSWORD_INPUT)).replaceText('123456');
  //
  //   await element(by.id(authScreenTestIDs.SUBMIT_REGISTER)).tap();
  // });

  // it('authentication flow', async () => {
  //   await element(by.id(authScreenTestIDs.LOGIN_EMAIL_INPUT)).typeText('marko@hotmail.com');
  //   await element(by.id(authScreenTestIDs.LOGIN_PASSWORD_INPUT)).typeText('password');
  //   await element(by.id(authScreenTestIDs.LOGIN_PASSWORD_INPUT)).tapReturnKey();
  //   await expect(element(by.label('Currently no entries'))).toBeVisible();
  // });
});

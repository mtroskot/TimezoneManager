/*eslint-disable*/
import { authScreenTestIDs } from '../src/constants/testIDs';
import { authScreenText } from '../src/constants/text';
import { EMAIL_IN_USE, REGISTRATION_SUCCESS } from '../src/constants/messages';

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

  it('registration flow', async done => {
    await element(by.id(authScreenTestIDs.SWITCH_FORM)).tap();

    await element(by.id(authScreenTestIDs.FIRST_NAME_INPUT)).tap();
    await element(by.id(authScreenTestIDs.FIRST_NAME_INPUT)).typeText('Marko');
    await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).tap();
    await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).typeText('Troskot');
    await element(by.id(authScreenTestIDs.LAST_NAME_INPUT)).tapReturnKey();
    await element(by.id(authScreenTestIDs.EMAIL_INPUT)).typeText('marko@gmail.com');
    await element(by.id(authScreenTestIDs.PASSWORD_INPUT)).tap();
    await element(by.id(authScreenTestIDs.PASSWORD_INPUT)).typeText('123456');
    await device.disableSynchronization();
    await element(by.id(authScreenTestIDs.MATCHING_PASSWORD_INPUT)).tap();
    await element(by.id(authScreenTestIDs.MATCHING_PASSWORD_INPUT)).typeText('123456');
    //TAP REGISTER
    await element(by.id(authScreenTestIDs.SUBMIT_REGISTER)).tap();
    await waitFor(element(by.label(REGISTRATION_SUCCESS)))
      .toBeVisible()
      .withTimeout(1000);
    //should successfully register
    await expect(element(by.label(REGISTRATION_SUCCESS))).toBeVisible();
    //TAP REGISTER AGAIN
    await element(by.id(authScreenTestIDs.SUBMIT_REGISTER)).tap();
    //should display email in use
    await waitFor(element(by.label(EMAIL_IN_USE)))
      .toBeVisible()
      .withTimeout(1000);
    await expect(element(by.label(EMAIL_IN_USE))).toBeVisible();
    done();
  });

  it('authentication flow', async done => {
    await waitFor(element(by.id(authScreenTestIDs.LOGIN_EMAIL_INPUT)))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id(authScreenTestIDs.LOGIN_EMAIL_INPUT)).typeText('marko@gmail.com');
    await element(by.id(authScreenTestIDs.LOGIN_PASSWORD_INPUT)).typeText('123456');
    await device.disableSynchronization();
    await element(by.id(authScreenTestIDs.LOGIN_PASSWORD_INPUT)).tapReturnKey();
    await waitFor(element(by.label('Currently no entries')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.label('Currently no entries'))).toBeVisible();
    done();
  });
});

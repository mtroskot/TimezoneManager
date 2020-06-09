import StringUtils from 'src/utils/StringUtils';
import ObjectUtils from 'src/utils/ObjectUtils';
import { iValidationErrors, iValidationResponse } from '../types/interfaces';
import { tPosition } from '../types/types';
import axios from 'axios';
import { togglePopupMessage } from '../store/ui/uiActions';
import { eMessages } from '../types/enums';
import store from '../store';

const emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex: RegExp = /^[a-zA-Z ]{2,20}$/;

/**
 * Populates error object if field is not valid
 * @param fieldName {String} The name of the field being validated
 * @param errorObject {Object} The object holding errors
 * @param validationResponse {{isValid: boolean, message: null}} Result of validated field
 * @returns {boolean} Returns whether the field is valid or not
 */
export function validate(fieldName: string, errorObject: iValidationErrors, validationResponse: iValidationResponse): boolean {
  if (!validationResponse.isValid) {
    errorObject[fieldName] = {
      display: true,
      errorMessage: validationResponse.message || `${StringUtils.camelCaseToWords(fieldName)} is invalid`
    };
    return false;
  }
  return true;
}

/**
 * Checks if names is valid
 * @param field {String}
 * @returns {{isValid: boolean, message: null}}
 */
export function isValidName(field: string): iValidationResponse {
  if (!ObjectUtils.exists(field)) {
    return { isValid: false, message: null };
  }
  return { isValid: nameRegex.test(field), message: null };
}

/**
 * Checks if email is valid
 * @param email {String}
 * @returns {{isValid: boolean, message: null}|{isValid: *, message: null}}
 */
export function isValidEmail(email: string): iValidationResponse {
  if (!ObjectUtils.exists(email)) {
    return { isValid: false, message: null };
  }
  return { isValid: emailRegex.test(email), message: null };
}

/**
 * Checks if password is valid
 * @param password {String}
 * @returns {{isValid: boolean, message: null}}
 */
export function isValidPassword(password: string): iValidationResponse {
  if (!ObjectUtils.exists(password)) {
    return { isValid: false, message: null };
  }
  return { isValid: password.length >= 6 && password.length <= 20, message: null };
}

/**
 * Cheks if matching password is valid
 * @param password
 * @param matchingPassword
 * @returns {{isValid: boolean, message: null}|{isValid: *, message: (null|string)}}
 */
export function isValidMatchingPassword(password: string, matchingPassword: string): iValidationResponse {
  const isValidFormat = isValidPassword(matchingPassword);
  if (!isValidFormat.isValid) {
    return isValidFormat;
  }
  const isValid = password === matchingPassword;
  return { isValid, message: isValid ? null : "Passwords don't match" };
}

/**
 * Checks if the error should be displayed and which message should be displayed
 * @param error The error
 * @param position The position where the message should appear
 */
function handleErrorMessage(error: Error, position: tPosition = 'top'): void {
  if (!axios.isCancel(error)) {
    if (error.message.toString().includes('Network')) {
      store.dispatch(togglePopupMessage(eMessages.NO_INTERNET, position));
    } else if (error.message.toString().includes('timeout')) {
      store.dispatch(togglePopupMessage(eMessages.TIMEOUT, position));
    } else {
      store.dispatch(togglePopupMessage(eMessages.DEFAULT_ERROR, position));
    }
  }
}

export default {
  validate,
  isValidName,
  isValidPassword,
  isValidMatchingPassword,
  isValidEmail,
  handleErrorMessage
};

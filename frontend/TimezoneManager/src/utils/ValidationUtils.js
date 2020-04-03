import StringUtils from 'src/utils/StringUtils';
import ObjectUtils from 'src/utils/ObjectUtils';
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[a-zA-Z ]{2,20}$/;

/**
 * Populates error object if field is not valid
 * @param fieldName {String} The name of the field being validated
 * @param errorObject {Object} The object holding errors
 * @param validationStatus {{isValid: boolean, message: null}} Result of validated field
 * @returns {boolean} Returns whether the field is valid or not
 */
export function validate(fieldName, errorObject, validationStatus) {
  if (!validationStatus.isValid) {
    errorObject[fieldName] = {
      display: true,
      errorMessage: validationStatus.message || `${StringUtils.camelCaseToWords(fieldName)} is invalid`
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
export function isValidName(field) {
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
export function isValidEmail(email) {
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
export function isValidPassword(password) {
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
export function isValidMatchingPassword(password, matchingPassword) {
  const isValidFormat = isValidPassword(matchingPassword);
  if (!isValidFormat.isValid) {
    return isValidFormat;
  }
  const isValid = password === matchingPassword;
  return { isValid, message: isValid ? null : "Passwords don't match" };
}

export default {
  validate,
  isValidName,
  isValidPassword,
  isValidMatchingPassword,
  isValidEmail
};

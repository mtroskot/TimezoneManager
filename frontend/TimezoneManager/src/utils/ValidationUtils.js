import StringUtils from 'src/utils/StringUtils';
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^(?! )[a-zA-Z ]{2,20}(?<! )$/;

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

export function isValidName(field) {
  return {
    isValid: nameRegex.test(field),
    message: null
  };
}

export function isValidEmail(email) {
  return { isValid: emailRegex.test(email), message: null };
}

export function isValidPassword(password) {
  return { isValid: password.length >= 6 && password.length <= 20, message: null };
}

export function isValidMatchingPassword(password, matchingPassword) {
  const isValidFormat = isValidPassword(matchingPassword);
  if (!isValidFormat.isValid) {
    return isValidFormat;
  }
  return { isValid: password === matchingPassword, message: "Passwords don't match" };
}

export default {
  validate,
  isValidName,
  isValidPassword,
  isValidMatchingPassword,
  isValidEmail
};

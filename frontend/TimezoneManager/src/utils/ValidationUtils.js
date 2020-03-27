import StringUtils from 'src/utils/StringUtils';

export function isValidField(fieldName, field, errorObject) {
  if (StringUtils.isEmpty(field)) {
    errorObject[fieldName] = {
      display: true,
      errorMessage: `${StringUtils.camelCaseToWords(fieldName)} is invalid`
    };
    return false;
  }
  return true;
}

export default {
  isValidField
};

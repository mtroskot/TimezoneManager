function isEmpty(str) {
  return str === null || str === undefined || str.trim() === '';
}

function isNotEmpty(str) {
  return !isEmpty(str);
}

function areEmpty(...strings) {
  return strings.some(str => str === null || str === undefined || str.trim() === '');
}

function areNotEmpty(...strings) {
  return !areEmpty(...strings);
}

function isString(str) {
  return typeof str === 'string';
}

/**
 * Returns initials of name
 * @param name {String} The name to get initials
 * @returns {String}
 */
function getNameInitials(name) {
  const splitName = name.split(' ');
  return splitName.length === 1 ? splitName[0][0] : `${splitName[0][0]} ${splitName[splitName.length - 1][0]}`;
}

/**
 * Converts number or string to GMT string
 * @param diff {Number|String}
 * @returns {String}
 */
function convertGMTDIffToString(diff) {
  const gmtDIff = parseInt(String(diff).replace('+', ''), 10);
  return gmtDIff <= 0 ? `${gmtDIff}` : `+${gmtDIff}`;
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

/**
 * Converts camel case string to words.
 * @param str {String}
 * @returns {String}
 */
function camelCaseToWords(str) {
  let newString = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (i === 0) {
      newString += char.toUpperCase();
    } else if (char === char.toUpperCase()) {
      newString += ' ' + char;
    } else {
      newString += char;
    }
  }
  return newString;
}

const StringUtils = {
  isEmpty,
  isNotEmpty,
  areEmpty,
  areNotEmpty,
  isString,
  getNameInitials,
  convertGMTDIffToString,
  capitalizeFirstLetter,
  camelCaseToWords
};

export default StringUtils;

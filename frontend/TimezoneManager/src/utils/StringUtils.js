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

function getNameInitials(name) {
  const splitName = name.split(' ');
  return splitName.length === 1 ? splitName[0][0] : `${splitName[0][0]} ${splitName[splitName.length - 1][0]}`;
}

const StringUtils = {
  isEmpty,
  isNotEmpty,
  areEmpty,
  areNotEmpty,
  isString,
  getNameInitials
};

export default StringUtils;

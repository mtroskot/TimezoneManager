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

const StringUtils = {
  isEmpty,
  isNotEmpty,
  areEmpty,
  areNotEmpty
};

export default StringUtils;

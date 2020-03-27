/**
 * Checks if @param obj exists
 * @param obj
 * @returns {boolean}
 */
function exists(obj) {
  return obj !== undefined && obj !== null;
}

/**
 * Checks if parameter is object
 * @param param
 * @returns {boolean}
 */
function isObject(param) {
  if (param === undefined) {
    return true;
  }
  return typeof param === 'object' && param !== null;
}

export default {
  exists,
  isObject
};

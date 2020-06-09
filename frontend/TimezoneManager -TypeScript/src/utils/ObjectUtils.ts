/**
 * Checks if @param obj is present
 * @param obj {Object}
 * @returns {boolean}
 */
function exists(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

/**
 * Checks if parameter is object
 * @param param {Object}
 * @returns {boolean}
 */
function isObject(param: any): boolean {
  if (param === undefined) {
    return true;
  }
  return typeof param === 'object' && param !== null;
}

export default {
  exists,
  isObject
};

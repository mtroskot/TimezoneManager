/**
 * Parses array of role objects to array of role strings
 * @param roleArray {Array} The array to be converted
 * @returns {Array}
 */
function parseRoles(roleArray) {
  return roleArray.map(role => role.type);
}

export default {
  parseRoles
};

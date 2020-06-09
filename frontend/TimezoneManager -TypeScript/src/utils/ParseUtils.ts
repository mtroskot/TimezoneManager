import { iRole } from '../types/interfaces';
/**
 * Parses array of role objects to array of role strings
 * @param roleArray {Array} The array to be converted
 * @returns {Array}
 */
function parseRoles(roleArray: iRole[]): string[] {
  return roleArray.map((role) => role.type);
}

export default {
  parseRoles
};

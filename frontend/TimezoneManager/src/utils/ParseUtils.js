function parseRoles(roleArray) {
  return roleArray.map(role => role.type);
}

export default {
  parseRoles
};

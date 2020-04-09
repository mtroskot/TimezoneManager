import { ADMIN, MANAGER, USER } from 'src/constants/userRoles';

export const dropdowns = Object.freeze({
  OWN_ENTRIES: 'OWN_ENTRIES',
  USERS: 'USERS',
  ALL_ENTRIES: 'ALL_ENTRIES'
});

export const filters = Object.freeze({
  CITY_NAME: 'CITY_NAME',
  ENTRY_NAME: 'ENTRY_NAME',
  GMT: 'GMT',
  FIRST_NAME: 'FIRST_NAME',
  LAST_NAME: 'LAST_NAME',
  EMAIL_ADDRESS: 'EMAIL_ADDRESS'
});

export const dropdownOptions = Object.freeze([
  Object.freeze({ value: dropdowns.OWN_ENTRIES, label: 'Own entries', requiredRole: USER }),
  Object.freeze({ value: dropdowns.USERS, label: 'Users', requiredRole: MANAGER }),
  Object.freeze({ value: dropdowns.ALL_ENTRIES, label: 'All entries', requiredRole: ADMIN })
]);

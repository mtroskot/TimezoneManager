import {eDropdowns, eUserRoles} from '../types/enums';
import {iDropdownOption} from "../types/interfaces";

export const dropdownOptions: readonly iDropdownOption[] = Object.freeze([
  Object.freeze({ value: eDropdowns.OWN_ENTRIES, label: 'Own entries', requiredRole: eUserRoles.USER }),
  Object.freeze({ value: eDropdowns.USERS, label: 'Users', requiredRole: eUserRoles.MANAGER }),
  Object.freeze({ value: eDropdowns.ALL_ENTRIES, label: 'All entries', requiredRole: eUserRoles.ADMIN })
]);

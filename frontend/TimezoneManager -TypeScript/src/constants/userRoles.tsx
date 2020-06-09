import {eUserRoles} from "../types/enums";
import {iRolePicker} from "../types/interfaces";

export const rolePicker: readonly iRolePicker[] = Object.freeze([
    {label: 'Regular', value: eUserRoles.USER},
    {label: 'Manager', value: eUserRoles.MANAGER},
    {label: 'Admin', value: eUserRoles.ADMIN}
]);

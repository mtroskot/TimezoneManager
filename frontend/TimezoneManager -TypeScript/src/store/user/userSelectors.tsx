import { createSelector } from 'reselect';
import { StoreState } from 'src/store/rootReducer';
import { eUserRoles } from 'src/types/enums';
import {iUser} from "src/types/interfaces";

export const userInfoSelector = (store: StoreState) => store.user.user as iUser;
export const userSelector = (store: StoreState) => store.user;
export const userRolesSelector = (store: StoreState) => store.user.user.roles as eUserRoles[];
export const accessTokenSelector = (store: StoreState) => store.user.accessToken;

export const mainUserRoleSelector = createSelector(userRolesSelector, (roles: eUserRoles[]) => {
  if (roles.includes(eUserRoles.ADMIN)) {
    return eUserRoles.ADMIN;
  } else if (roles.includes(eUserRoles.MANAGER)) {
    return eUserRoles.MANAGER;
  } else {
    return eUserRoles.USER;
  }
});

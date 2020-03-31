import { ADMIN, MANAGER, USER } from 'src/constants/userRoles';
import { createSelector } from 'reselect';

export const userInfoSelector = store => store.user.user;
export const userSelector = store => store.user;
export const userRolesSelector = store => store.user.user.roles;
export const accessTokenSelector = store => store.user.accessToken;

export const mainUserRoleSelector = createSelector(
  userRolesSelector,
  roles => {
    if (roles.includes(ADMIN)) {
      return ADMIN;
    } else if (roles.includes(MANAGER)) {
      return MANAGER;
    } else {
      return USER;
    }
  }
);

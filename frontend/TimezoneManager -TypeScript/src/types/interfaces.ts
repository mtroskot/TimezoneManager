import { eDropdowns, eFilters, eIDName, eUserRoles } from 'src/types/enums';
import { tBaseEntity, tObject } from 'src/types/types';
import { StoreActionTypes } from 'src/types/store/actionTypes';
import { AxiosRequestConfig } from 'axios';

export interface iSearchData<T> {
  searchResults: T[];
  searchQuery: string;
  message: string;
}

export interface iDropdownOption {
  value: eDropdowns;
  label: string;
  requiredRole: eUserRoles;
}

export interface iDropdown {
  showDropdown: boolean;
  initialScrollIndex: number;
}

export interface iFilterOption {
  value: eFilters;
  label: string;
  selected: boolean;
}

export interface iAvatarInfo {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface iTimezoneEntry {
  name: string;
  cityName: string;
  differenceToGMT: string;
}

export interface iSavedTimezoneEntry extends iTimezoneEntry, tBaseEntity {
  [eIDName.TIMEZONE_ENTRY_ID]: number;
}

export interface iRegisterUserForm {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  matchingPassword: string;
}

export interface iEditUserForm extends iRegisterUserForm, tBaseEntity {
  [eIDName.USER_ID]: number;
}

export interface iUserForEdit extends tBaseEntity {
  [eIDName.USER_ID]: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface iLoginForm {
  emailAddress: string;
  password: string;
}

export interface iEmptyUser {
  [eIDName.USER_ID]: null;
  username: null;
  firstName: null;
  lastName: null;
  emailAddress: null;
  roles: [];
}

export interface iUser extends tBaseEntity {
  [eIDName.USER_ID]: number;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  roles: string[];
}

export interface iRole {
  type: string;
}

export interface iRolePicker {
  label: string;
  value: eUserRoles;
}

export interface iAction {
  name: StoreActionTypes;
  params?: tObject;
}

export interface iValidationError {
  display: boolean;
  errorMessage: string;
}

export interface iValidationErrors {
  [key: string]: iValidationError;
}

export interface iValidationResponse {
  isValid: boolean;
  message?: string | null;
}

export interface iRequest {
  url: string;
  options: AxiosRequestConfig;
  includeAuthorizationHeader?: boolean;
}

export interface iRequestConfig extends AxiosRequestConfig {
  retry: boolean;
}

import { StringUtils } from 'src/utils';
import { CancelToken } from 'axios';
import {iEditUserForm, iRequest, iUserForEdit} from '../../types/interfaces';
import { tRequestParams, tStringOrNull } from '../../types/types';

const prefix: string = 'users';

const changeUserRole = (userId: number, role: string): iRequest => ({
  url: `${prefix}/changeRole?userId=${userId}&role=${role}`,
  options: {
    method: 'PUT'
  }
});

const filterUsers = (
  firstName: tStringOrNull,
  lastName: tStringOrNull,
  emailAddress: tStringOrNull,
  cancelToken: CancelToken
): iRequest => {
  const params: tRequestParams = [
    { key: 'firstName', value: firstName },
    { key: 'lastName', value: lastName },
    { key: 'emailAddress', value: emailAddress }
  ];
  const requestParams = StringUtils.buildRequestParams(params);
  return {
    url: `${prefix}/search?${requestParams}`,
    options: {
      method: 'GET',
      cancelToken
    }
  };
};

const updateUserInfo = (updateUserInfoForm: iUserForEdit): iRequest => {
  const { id, firstName, lastName, emailAddress } = updateUserInfoForm;
  return {
    url: `${prefix}`,
    options: {
      method: 'PUT',
      validateStatus(status: number) {
        return [200, 400].includes(status);
      },
      data: { id, firstName, lastName, emailAddress }
    }
  };
};

const deleteUser = (userId: number): iRequest => ({
  url: `${prefix}?userId=${userId}`,
  options: {
    method: 'DELETE'
  }
});

const getUserTimezoneEntries = (userId: number): iRequest => ({
  url: `${prefix}/${userId}/timezoneEntries`,
  options: {
    method: 'GET'
  }
});

const filterUserTimezoneEntries = (
  userId: number,
  cityName: tStringOrNull,
  name: tStringOrNull,
  gmt: tStringOrNull,
  cancelToken: CancelToken
): iRequest => {
  const params: tRequestParams = [
    { key: 'cityName', value: cityName },
    { key: 'name', value: name },
    { key: 'gmt', value: gmt }
  ];
  const requestParams = StringUtils.buildRequestParams(params);
  return {
    url: `${prefix}/${userId}/timezoneEntries/search?${requestParams}`,
    options: {
      method: 'GET',
      cancelToken
    }
  };
};

export default {
  changeUserRole,
  filterUsers,
  updateUserInfo,
  deleteUser,
  getUserTimezoneEntries,
  filterUserTimezoneEntries
};

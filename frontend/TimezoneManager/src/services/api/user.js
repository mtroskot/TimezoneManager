import { StringUtils } from 'src/utils';

const prefix = 'users';

const changeUserRole = (userId, role) => ({
  url: `${prefix}/changeRole?userId=${userId}&role=${role}`,
  options: {
    method: 'PUT'
  }
});

const filterUsers = (firstName, lastName, emailAddress, cancelToken) => {
  const params = [
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

const updateUserInfo = updateUserInfoForm => {
  const { id, firstName, lastName, emailAddress } = updateUserInfoForm;
  return {
    url: `${prefix}`,
    options: {
      method: 'PUT',
      validateStatus(status) {
        return [200, 400].includes(status);
      },
      data: { id, firstName, lastName, emailAddress }
    }
  };
};

const deleteUser = userId => ({
  url: `${prefix}?userId=${userId}`,
  options: {
    method: 'DELETE'
  }
});

const getUserTimezoneEntries = userId => ({
  url: `${prefix}/${userId}/timezoneEntries`,
  options: {
    method: 'GET'
  }
});

const filterUserTimezoneEntries = (userId, cityName, name, gmt) => {
  const params = [{ key: 'cityName', value: cityName }, { key: 'name', value: name }, { key: 'gmt', value: gmt }];
  const requestParams = StringUtils.buildRequestParams(params);
  return {
    url: `${prefix}/${userId}/timezoneEntries/search?${requestParams}`,
    options: {
      method: 'GET'
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

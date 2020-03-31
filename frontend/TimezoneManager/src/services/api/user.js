const prefix = 'users';

const changeUserRole = (userId, role) => ({
  url: `${prefix}/changeRole?userId=${userId}&role=${role}`,
  options: {
    method: 'PUT'
  }
});

const filterUsers = (input, cancelToken) => ({
  url: `${prefix}/filter?input=${input}`,
  options: {
    method: 'GET',
    cancelToken
  }
});

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

export default {
  changeUserRole,
  filterUsers,
  updateUserInfo,
  deleteUser
};

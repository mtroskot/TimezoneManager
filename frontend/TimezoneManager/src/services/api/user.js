const prefix = 'users';
const login = (emailAddress, password) => ({
  url: `${prefix}/login`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus(status) {
      return status === 200 || status === 400; // Accept only status code 200
    },
    data: { emailAddress, password }
  }
});

const register = registerData => {
  const { firstName, lastName, emailAddress, password, matchingPassword } = registerData;
  return {
    url: `${prefix}/register`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        firstName,
        lastName,
        emailAddress,
        password,
        matchingPassword
      }
    }
  };
};

const getUserInfo = authToken => ({
  url: `/users/me`,
  options: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
});

export default {
  login,
  register,
  getUserInfo
};

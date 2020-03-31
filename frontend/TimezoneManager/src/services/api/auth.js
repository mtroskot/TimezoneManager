const prefix = 'auth';

const login = (emailAddress, password) => ({
  url: `${prefix}/login`,
  options: {
    method: 'POST',
    validateStatus(status) {
      return [200, 400, 401].includes(status);
    },
    data: { emailAddress, password }
  },
  includeAuthorizationHeader: false
});

const logout = refreshToken => ({
  url: `${prefix}/logout`,
  options: {
    method: 'POST',
    validateStatus(status) {
      return [200, 401].includes(status);
    },
    data: { refreshToken }
  },
  includeAuthorizationHeader: true
});

const register = registerData => {
  const { firstName, lastName, emailAddress, password, matchingPassword } = registerData;
  return {
    url: `${prefix}/register`,
    options: {
      method: 'POST',
      validateStatus(status) {
        return [200, 201, 400, 409].includes(status);
      },
      data: {
        firstName,
        lastName,
        emailAddress,
        password,
        matchingPassword
      }
    },
    includeAuthorizationHeader: false
  };
};

const refreshToken = (accessToken, refreshToken, userId) => ({
  url: `${prefix}/refresh?userId=${userId}`,
  options: {
    method: 'POST',
    validateStatus(status) {
      return [200, 201].includes(status);
    },
    data: { accessToken, refreshToken }
  },
  includeAuthorizationHeader: false
});

export default {
  login,
  logout,
  register,
  refreshToken
};

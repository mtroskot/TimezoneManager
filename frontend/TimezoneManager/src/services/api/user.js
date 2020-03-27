const login = (emailAddress, password) => ({
  url: `users/login`,
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

const register = (firstName, lastName, emailAddress, password) => ({
  url: `users/register`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstName,
      lastName,
      emailAddress,
      password
    }
  }
});

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

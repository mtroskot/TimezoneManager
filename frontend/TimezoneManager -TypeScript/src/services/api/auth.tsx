import { iRegisterUserForm, iRequest } from '../../types/interfaces';

const prefix: string = 'auth';

const login = (emailAddress: string, password: string): iRequest => ({
  url: `${prefix}/login`,
  options: {
    method: 'POST',
    validateStatus(status: number) {
      return [200, 400, 401].includes(status);
    },
    data: { emailAddress, password }
  },
  includeAuthorizationHeader: false
});

const logout = (refreshToken: string): iRequest => ({
  url: `${prefix}/logout`,
  options: {
    method: 'POST',
    validateStatus(status) {
      return [200, 401].includes(status);
    },
    data: { refreshToken }
  }
});

const register = (registerData: iRegisterUserForm): iRequest => {
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

const refreshToken = (accessToken: string, refreshToken: string, userId: number): iRequest => ({
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

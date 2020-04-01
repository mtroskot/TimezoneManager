import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
const CancelToken = axios.CancelToken;
import store from 'src/store';
import { accessTokenSelector, userSelector } from 'src/store/user/userSelectors';
import { logoutUser, refreshTokenSuccess } from 'src/store/user/userActions';

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json'
  },
  validateStatus(status) {
    return [200, 201].includes(status); // Accept only status code 2xx or 401 if token expired
  },
  timeout: 5000
};

/**
 * Calls api and returns response data if status OK.
 * setTimeout needed for android to cancel request, if you don't have internet connection or the IP address or
 * domain name that you're requesting not there,in this case axios timeout will not work.
 * @param {string} url The api endpoint.
 * @param {object} options The request options.
 * @returns {Promise<AxiosResponse<any>>}
 */
async function callApi({ url, includeAuthorizationHeader = true, options }) {
  let source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, 6000);
  let fetchOptions = { ...defaultOptions, cancelToken: source.token, ...options };
  if (includeAuthorizationHeader) {
    const accessToken = accessTokenSelector(store.getState());
    fetchOptions = {
      ...fetchOptions,
      headers: { ...fetchOptions.headers, Authorization: `Bearer ${accessToken}` }
    };
  }
  return axios(url, fetchOptions);
}

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    if (!error.message.toString().includes('Network')) {
      if (error.response.status === 401 && originalRequest.url.includes('auth/refresh')) {
        store.dispatch(logoutUser());
        return Promise.reject(error);
      }
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const user = userSelector(store.getState());
        return axios
          .post(`${BASE_URL}auth/refresh?userId=${user.user.id}`, {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
          })
          .then(res => {
            if ([200, 201].includes(res.status)) {
              const { accessToken, refreshToken } = res.data;
              store.dispatch(refreshTokenSuccess(accessToken, refreshToken));

              originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
              return axios(originalRequest);
            }
          });
      }
    }
    return Promise.reject(error);
  }
);

export default {
  callApi
};

export { default as userRequests } from 'src/services/api/user';
export { default as authRequests } from 'src/services/api/auth';
export { default as timezoneRequests } from 'src/services/api/timezone';

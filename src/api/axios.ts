import axios from 'axios';
import { refreshToken } from '.';
import { LocalStorageService } from '../shared/services';
import { TokenSave } from '../shared/types';

const token: TokenSave | null = LocalStorageService.Instance.get('token');

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  Authorization: token?.access_token
    ? `Bearer ${token.access_token}`
    : 'NO TOKEN',
};

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API}/api`,
  timeout: 5000,
  withCredentials: false,
  headers,
});

// refresh token and retry request
Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      !error.config.url?.includes('auth/refresh') &&
      !error.config.url?.includes('auth/login') &&
      !error.config.url?.includes('auth/logout')
    ) {
      return refreshToken(token?.refresh_token ?? 'NO TOKEN')
        .then((tokens) => {
          if (!tokens) {
            return Promise.reject(error);
          }
          LocalStorageService.Instance.save('token', tokens);
          return Promise.resolve(tokens);
        })
        .catch(() => {
          LocalStorageService.Instance.delete('token');
        })
        .finally(() => {
          window.location.reload();
        });
    }

    return Promise.reject(error);
  }
);

export default Axios;

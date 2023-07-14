import { LocalStorageService } from '../shared/services';
import {
  LoginForm,
  RegisterForm,
  TokenResponse,
  TokenSave,
  User,
} from '../shared/types';
import Axios from './axios';

export function http_Login(loginForm: LoginForm): Promise<User> {
  return Axios.post('auth/login', loginForm)
    .then((res) => {
      LocalStorageService.Instance.save('token', res.data);
      return getProfile(res.data.access_token);
    })
    .catch((error) => {
      if (error.message.includes('timeout')) {
        return Promise.reject('timeout');
      }

      if (error.response.status === 400) {
        return Promise.reject(error.response.data.message);
      }

      if (error.response.status === 401) {
        return Promise.reject(error.response.data.message);
      }

      return Promise.reject('unknown error');
    });
}

export function http_Register(registerForm: RegisterForm): Promise<User> {
  return Axios.post('auth/register', registerForm)
    .then((res) => {
      LocalStorageService.Instance.save('token', res.data);
      return getProfile(res.data.access_token);
    })
    .catch((error) => {
      if (error.message.includes('timeout')) {
        return Promise.reject('timeout');
      }

      if (error.response.status === 400) {
        return Promise.reject(error.response.data.message);
      }

      return Promise.reject('unknown error');
    });
}

export function http_Logout(): Promise<boolean> {
  const token: TokenSave | null = LocalStorageService.Instance.get('token');
  console.log(token);
  return Axios.post(
    'auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    }
  );
}

export function getProfile(token: string): Promise<User> {
  return Axios.get('users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
}

export function refreshToken(token: string): Promise<TokenResponse> {
  return Axios.get('auth/refresh', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      Promise.reject(error);
    });
}

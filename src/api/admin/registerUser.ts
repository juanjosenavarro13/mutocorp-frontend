import { RegisterForm } from '../../shared/types';
import Axios from '../axios';

export function http_RegisterAdmin(registerForm: RegisterForm) {
  return Axios.post('auth/register', registerForm).catch((error) => {
    if (error.message.includes('timeout')) {
      return Promise.reject('timeout');
    }

    if (error.response.status === 400) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject('unknown error');
  });
}

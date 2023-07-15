import { UpdatedProfile } from '.';
import Axios from '../axios';

export function updateProfile(user: UpdatedProfile) {
  return Axios.post('users/profile', user)
    .then((res) => {
      return res.data;
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

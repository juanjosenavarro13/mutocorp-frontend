import Axios from '../axios';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function getAllUsers(): Promise<User[]> {
  return Axios.get('admin/users')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.message.includes('timeout')) {
        return Promise.reject('timeout');
      }

      if (error.response?.status === 400) {
        return Promise.reject(error.response.data.message);
      }

      if (error.response.status === 401) {
        return Promise.reject(error.response.data.message);
      }

      return Promise.reject('unknown error');
    });
}

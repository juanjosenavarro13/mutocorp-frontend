import Axios from '../axios';

export interface Raider {
  _id: string;
  name: string;
  user: string;
  hikoins: string;
  createdAt: string;
  updatedAt: string;
}

export function getAllRaiders(): Promise<Raider[]> {
  return Axios.get('admin/raiders')
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

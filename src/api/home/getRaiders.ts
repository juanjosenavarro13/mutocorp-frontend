import Axios from '../axios';
import { Raider } from './raiders.model';

export function getRaiders(): Promise<Raider[]> {
  return Axios.get('raiders')
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

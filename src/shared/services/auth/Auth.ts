import { getProfile } from '../../../api';
import { TokenSave, User } from '../../types';
import { LocalStorageService } from '../';

export async function persistentLogin(): Promise<User> {
  const token: TokenSave | null = LocalStorageService.Instance.get('token');

  if (token) {
    return getProfile(token.access_token)
      .then((user) => {
        return user;
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  return Promise.reject();
}

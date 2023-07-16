import Axios from '../axios';

interface RegisterForm {
  name: string;
  hikoins: number | null;
  user: string;
}

export function http_RegisterRaider(registerForm: RegisterForm) {
  if (registerForm.hikoins === 0) {
    registerForm.hikoins = null;
  }

  return Axios.post('admin/raiders/create', registerForm).catch((error) => {
    if (error.message.includes('timeout')) {
      return Promise.reject('timeout');
    }

    if (error.response.status === 400) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject('unknown error');
  });
}

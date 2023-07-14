import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '..';
import { http_Register } from '../../../api';
import { RegisterForm, User } from '../../types';
import Alert from '../alert/Alert';
import { Input } from '../input';
import { UserStateContext } from '../../../context/user';

export default function Register() {
  const [t] = useTranslation('register', { keyPrefix: 'register' });
  const navigate = useNavigate();
  const userContext = useContext(UserStateContext);

  const [errors, setErrors] = useState<string | string[]>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleOnChange = (value: string, param: string) => {
    setRegisterForm({
      ...registerForm,
      [param]: value,
    });
  };

  const resetForm = () => {
    setRegisterForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    const user = await http_Register(registerForm)
      .then((user: User) => {
        resetForm();
        navigate('/');
        return user;
      })
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => {
        setLoading(false);
      });
    if (user) {
      userContext.setUser({ ...user, auth: true });
    }
  };

  return (
    <>
      {errors && (
        <Alert type="error" title={t('registerErrorTitle')} message={errors} />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit} className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            initialValue={registerForm.name}
            label={t('name')}
            name="name"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'name');
            }}
          />
          <Input
            type="email"
            initialValue={registerForm.email}
            label={t('email')}
            name="email"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'email');
            }}
          />
          <Input
            type="password"
            initialValue={registerForm.password}
            label={t('password')}
            name="password"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'password');
            }}
          />
          <Input
            type="password"
            initialValue={registerForm.password_confirmation}
            label={t('passwordConfirmation')}
            name="password_confirmation"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'password_confirmation');
            }}
          />
          <Button type="submit" label={t('register')} />
        </form>
      )}
    </>
  );
}

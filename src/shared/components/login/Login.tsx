import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Input, Spinner } from '..';
import { http_Login } from '../../../api';
import { Link, useNavigate } from 'react-router-dom';
import { UserStateContext } from '../../../context/user/UserStateProvider';

export default function Login() {
  const [t] = useTranslation('login', { keyPrefix: 'login' });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | string[]>('');
  const navigate = useNavigate();

  const userContext = useContext(UserStateContext);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (value: string, param: string) => {
    setLoginForm({
      ...loginForm,
      [param]: value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    const user = await http_Login(loginForm)
      .then((user) => {
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

  const resetForm = () => {
    setLoginForm({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {errors && (
        <Alert type="error" title={t('loginErrorTitle')} message={errors} />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit} className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="email"
            initialValue={loginForm.email}
            label={t('email')}
            name="email"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'email');
            }}
          />
          <Input
            type="password"
            initialValue={loginForm.password}
            label={t('password')}
            name="password"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'password');
            }}
          />
          <Button type="submit" label={t('login')} />
          <p className="text-gray-500 dark:text-gray-400">
            {t('textRegister')}{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              {t('register')}
            </Link>
          </p>
        </form>
      )}
    </>
  );
}

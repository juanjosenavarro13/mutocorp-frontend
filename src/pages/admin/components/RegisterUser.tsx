import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { http_RegisterAdmin } from '../../../api/admin/registerUser';
import { Alert, Button, Input, Spinner } from '../../../shared/components';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface Props {
  onRegister: () => void;
}

export default function RegisterUser(props: Props) {
  const { onRegister } = props;
  const [t] = useTranslation('register', { keyPrefix: 'register' });

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
    http_RegisterAdmin(registerForm)
      .then((user) => {
        resetForm();
        onRegister();
        return user;
      })
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => {
        setLoading(false);
      });
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

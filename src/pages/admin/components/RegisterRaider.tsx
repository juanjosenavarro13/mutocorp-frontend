import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { http_RegisterRaider } from '../../../api/admin/registerRaider';
import { Alert, Button, Input, Spinner } from '../../../shared/components';
import { User } from '../../../api';

interface RegisterForm {
  name: string;
  hikoins: number | null;
  user: string;
}

interface Props {
  onRegister: () => void;
  users: User[];
}

export default function RegisterRaider(props: Props) {
  const { onRegister } = props;
  const [t] = useTranslation('register', { keyPrefix: 'register' });

  const [errors, setErrors] = useState<string | string[]>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: '',
    hikoins: null,
    user: '',
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
      hikoins: null,
      user: '',
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    http_RegisterRaider(registerForm)
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
      {loading && props.users.length > 0 ? (
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
            type="number"
            initialValue={registerForm.hikoins ?? 0}
            label="Hikoins"
            name="Hikoins"
            onChangeValue={(value: string) => {
              handleOnChange(value, 'hikoins');
            }}
          />

          <div>
            <label
              htmlFor="raiders"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Usuario asociado
            </label>
            <select
              id="raiders"
              defaultValue={'DEFAULT'}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                handleOnChange(e.target.value, 'user');
              }}
            >
              {props.users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" label="Crear" />
        </form>
      )}
    </>
  );
}

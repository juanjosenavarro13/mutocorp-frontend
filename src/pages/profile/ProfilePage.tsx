import { Suspense, useEffect, useState } from 'react';
import { Alert, Button, Input, Spinner } from '../../shared/components';
import { Profile } from './profile.model';
import { UpdatedProfile, getProfile, updateProfile } from '../../api/profile';
import { formatDate } from '../../shared/services';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const [t] = useTranslation('profile', { keyPrefix: 'profile' });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    role: '',
    created_at: '',
    updated_at: '',
  });

  const [errors, setErrors] = useState<string[] | string>('');
  const [success, setSuccess] = useState<string>('');

  const onChangeValue = (value: string, name: string) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    if (profile.name === '' || profile.email === '') {
      setErrors('Name and Email are required');
      setSuccess('');
    } else {
      const dateUpdate: UpdatedProfile = {
        name: profile.name,
        email: profile.email,
      };

      updateProfile(dateUpdate).then(() => {
        setProfile({ ...profile, updated_at: new Date().toISOString() });
        setSuccess('Profile updated successfully');
        setErrors('');
      });
    }
  };

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {errors.length > 0 && (
            <Suspense fallback={<Spinner />}>
              <Alert type="error" message={errors} />
            </Suspense>
          )}
          {success !== '' && (
            <Suspense fallback={<Spinner />}>
              <Alert type="info" message={success} />
            </Suspense>
          )}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Input
              type="text"
              label={t('name')}
              initialValue={profile.name}
              onChangeValue={(value) => {
                onChangeValue(value, 'name');
              }}
            />
            <Input
              type="text"
              label={t('email')}
              initialValue={profile.email}
              onChangeValue={(value) => {
                onChangeValue(value, 'email');
              }}
            />
            <Input
              type="text"
              label={t('role')}
              initialValue={profile.role}
              disabled
            />
            <div className="flex gap-14 justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('updated')}
                </label>
                <p>{formatDate(profile.updated_at)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('created')}
                </label>
                <p>{formatDate(profile.created_at)}</p>
              </div>
            </div>
            <Button label={t('save')} onClick={handleUpdate} type="button" />
          </div>
        </>
      )}
    </>
  );
}

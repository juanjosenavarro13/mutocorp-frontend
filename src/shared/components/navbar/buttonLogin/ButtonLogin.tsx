import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../..';

export default function ButtonLogin() {
  const [t] = useTranslation('navbar', { keyPrefix: 'navbar' });
  return (
    <Link to="/login">
      <Button label={t('identify_yourself')} type="button" />
    </Link>
  );
}

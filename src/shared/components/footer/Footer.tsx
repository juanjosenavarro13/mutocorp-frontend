import { useTranslation } from 'react-i18next';
import { ChangeLanguage } from '../changeLanguage/';
import { Link } from 'react-router-dom';
import { AppConstants } from '../../constants';

export default function Footer() {
  const [t] = useTranslation('footer', { keyPrefix: 'footer' });

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {new Date().getFullYear()}{' '}
        <Link to="/" className="hover:underline">
          {AppConstants.ALIAS}
        </Link>{' '}
        {t('copyright')}
      </span>
      <ChangeLanguage />
    </footer>
  );
}

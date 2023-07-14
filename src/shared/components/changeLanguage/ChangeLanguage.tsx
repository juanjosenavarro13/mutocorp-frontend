import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function ChangeLanguage() {
  const [t, i18next] = useTranslation('changeLanguage', {
    keyPrefix: 'changeLanguage',
  });

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18next.changeLanguage(event.target.value);
  };

  return (
    <>
      <Helmet>
        <html lang={i18next.language} />
      </Helmet>
      <div className="flex">
        <select
          onChange={changeLanguage}
          defaultValue={i18next.language}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="es">{t('es')}</option>
          <option value="en">{t('en')}</option>
        </select>
      </div>
    </>
  );
}

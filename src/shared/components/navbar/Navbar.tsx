import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserStateContext } from '../../../context/user';
import { AppConstants } from '../../constants/';
import useToggleHidden from '../../hooks/ToggleHidden';
import { ToggleTheme } from '../toggleTheme';
import { ButtonLogin, LinkMenu, NavbarUser } from './';

import LOGO from '../../../assets/images/logo/MutoCorpLogo2.webp';

export default function Navbar() {
  const { hidden, toggleHidden } = useToggleHidden();
  const [t] = useTranslation('navbar', {
    keyPrefix: 'navbar',
    useSuspense: true,
  });

  const userContext = useContext(UserStateContext);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src={LOGO}
            className="h-8 mr-3"
            alt={AppConstants.ALIAS}
            width={'32px'}
            height={'32px'}
          />

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {AppConstants.ALIAS}
          </span>
        </Link>
        <div className="md:order-2 flex">
          <ToggleTheme />
        </div>
        <div className="flex md:order-3">
          <div className="hidden md:block">
            {userContext.user.auth ? <NavbarUser /> : <ButtonLogin />}
          </div>
          <button
            onClick={toggleHidden}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">{t('open_main_menu')}</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          hidden={hidden}
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <LinkMenu to="/" label={t('menu.home')} />

            <div className="md:hidden mt-3">
              {userContext.user ? <NavbarUser /> : <ButtonLogin />}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

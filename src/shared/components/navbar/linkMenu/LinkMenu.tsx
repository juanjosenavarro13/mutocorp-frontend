import { Link, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  label: string;
};

export default function LinkMenu(props: Props) {
  const { to, label } = props;

  const activeStyle =
    'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500';

  const inactiveStyle =
    'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';

  const location = useLocation();

  const style = location.pathname === to ? activeStyle : inactiveStyle;

  return (
    <li>
      <Link to={to} className={style}>
        {label}
      </Link>
    </li>
  );
}

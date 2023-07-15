import { Navigate } from 'react-router-dom';
import { useUserState } from '../../../context/user';
import { Suspense } from 'react';
import { Spinner } from '../../components';

type Props = {
  children: React.ReactElement;
  authenticated?: boolean;
};

export default function AuthGuard(props: Props) {
  const { children, authenticated = true } = props;

  const { user } = useUserState();

  if (authenticated && user.auth === false) {
    return <Navigate to="/login" />;
  }

  if (!authenticated && user.auth === true) {
    return <Navigate to="/" />;
  }

  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

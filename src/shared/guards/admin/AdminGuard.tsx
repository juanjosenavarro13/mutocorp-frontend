import { Navigate } from 'react-router-dom';
import { useUserState } from '../../../context/user';
import { Suspense } from 'react';
import { Spinner } from '../../components';

type Props = {
  children: React.ReactElement;
};

export default function AdminGuard(props: Props) {
  const { children } = props;

  const { user } = useUserState();

  if (user.role !== 'admin' && user.auth !== true && user.auth !== undefined) {
    return <Navigate to="/" />;
  }

  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

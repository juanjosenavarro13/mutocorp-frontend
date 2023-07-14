import { Suspense } from 'react';
import { Login, Spinner } from '../../shared/components/';

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    </>
  );
}

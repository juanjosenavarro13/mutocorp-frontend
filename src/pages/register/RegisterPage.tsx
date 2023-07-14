import { Register, Spinner } from '../../shared/components';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Register />
      </Suspense>
    </div>
  );
}

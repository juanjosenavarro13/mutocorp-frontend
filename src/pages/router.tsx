import { Route, Routes } from 'react-router-dom';
import {
  ErrorPage,
  HomePage,
  Layout,
  LoginPage,
  ProfilePage,
  RegisterPage,
  AdminPage,
} from '.';
import { AdminGuard, AuthGuard } from '../shared/guards';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthGuard authenticated={false}>
              <LoginPage />
            </AuthGuard>
          }
        />
        <Route
          path="/register"
          element={
            <AuthGuard authenticated={false}>
              <RegisterPage />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminPage />
            </AdminGuard>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

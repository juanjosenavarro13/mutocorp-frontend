import { BrowserRouter } from 'react-router-dom';
import { useGlobalState } from './context/global/';
import Router from './pages/router';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useUserState } from './context/user';
import { persistentLogin } from './shared/services';

export default function App() {
  const { theme } = useGlobalState();
  const { user, setUser } = useUserState();

  useEffect(() => {
    if (user.auth === undefined) {
      persistentLogin()
        .then((user) => {
          setUser({ ...user, auth: true });
        })
        .catch(() => {
          setUser({ ...user, auth: false });
        });
    }
  }, [theme, user, setUser]);

  return (
    <>
      <Helmet>
        <html className={theme} />
        <meta name="description" content="JNP" />
      </Helmet>

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

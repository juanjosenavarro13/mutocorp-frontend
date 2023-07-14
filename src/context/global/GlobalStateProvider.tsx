import React, { createContext, useContext, useMemo, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { UserStateProvider } from '../user/UserStateProvider';

type Theme = 'light' | 'dark';

export interface GlobalStateInterface {
  theme: Theme;
}

type GlobalStateContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const GlobalStateContext = createContext<null | GlobalStateContextType>(
  null
);

const getSavedTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    return 'dark';
  }
  return 'light';
};

function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [stateApp, setStateApp] = useState<GlobalStateInterface>({
    theme: getSavedTheme(),
  });

  const contextValue = useMemo(
    () => ({
      ...stateApp,
      setTheme: (theme: Theme) => {
        localStorage.setItem('theme', theme);
        setStateApp({ ...stateApp, theme });
      },
    }),
    [stateApp]
  );

  return (
    <GlobalStateContext.Provider value={contextValue}>
      <UserStateProvider>
        <HelmetProvider>{children}</HelmetProvider>
      </UserStateProvider>
    </GlobalStateContext.Provider>
  );
}

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalStateProvider, useGlobalState };

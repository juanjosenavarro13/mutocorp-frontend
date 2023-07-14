import React, { createContext, useContext, useMemo, useState } from 'react';
import { User } from '../../shared/types';

export interface UserStateInterface {
  user: User;
}

type UserStateContextType = {
  user: User;
  setUser: (user: User) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserStateContext = createContext<UserStateContextType>({} as any);

function UserStateProvider({ children }: { children: React.ReactNode }) {
  const [stateUser, setStateUser] = useState<UserStateInterface>({
    user: {
      id: '',
      name: '',
      email: '',
      created_at: new Date(),
      updated_at: new Date(),
      refreshToken: '',
      role: '',
      auth: undefined,
    },
  });

  const contextValue = useMemo(
    () => ({
      ...stateUser,
      setUser: (user: User) => {
        if (user) {
          setStateUser({ ...stateUser, user });
        } else {
          setStateUser({
            ...stateUser,
            user: {
              id: '',
              name: '',
              email: '',
              created_at: new Date(),
              updated_at: new Date(),
              refreshToken: '',
              role: '',
              auth: undefined,
            },
          });
        }
      },
    }),
    [stateUser]
  );

  return (
    <UserStateContext.Provider value={contextValue}>
      {children}
    </UserStateContext.Provider>
  );
}

const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserStateContext');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserStateProvider, useUserState };

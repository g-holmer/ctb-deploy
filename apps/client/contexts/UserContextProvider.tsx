import { createContext, useEffect, useState } from 'react';

import React from 'react';

interface Props {
  children: any;
}
export const UserContext = createContext({ user: null });
export const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {}, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import React from 'react';

export const AuthContext = React.createContext({});

interface Props {
  children: any;
}

export const AuthContextProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signUp }}>
      {props.children}
    </AuthContext.Provider>
  );
};

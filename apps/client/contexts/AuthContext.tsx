import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import React from 'react';

export const AuthContext = React.createContext({});

interface Props {
  children: any;
}
import { useRouter } from 'next/router';

export const AuthContextProvider = (props: Props) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, signup, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import { createContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@ctb/firebase-auth';
import React from 'react';

export const AuthContext = React.createContext({});

interface Props {
  children: any;
}

export const AuthContextProvider = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
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
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  const signInWithGoogle = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        resetPassword,
        loading,
        setLoading,
        signInWithGoogle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

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
  const [navigatorPosition, setNavigatorPosition] = useState<any>(null);
  const [companiesMockData, setCompaniesMockData] = useState<any>(null);
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
  const triggerNavigator = () => {
    function success(pos) {
      const crd = pos.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      //   const accuracy = crd.accuracy;
      setNavigatorPosition({
        lat: latitude,
        lng: longitude,
        // accuracy: accuracy,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (!navigatorPosition)
      navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    fetch('https://api.npoint.io/62cfdb123b0dcde60dec')
      .then((data) => data.json())
      .then((data) => {
        setCompaniesMockData(data);
      });
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
        navigatorPosition,
        setNavigatorPosition,
        triggerNavigator,
        companiesMockData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

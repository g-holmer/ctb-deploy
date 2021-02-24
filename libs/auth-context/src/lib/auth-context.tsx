import { createContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@ctb/firebase-auth';
import React from 'react';
import Geocode from 'react-geocode';
import { useRouter } from 'next/router';
export const AuthContext = React.createContext({});
import styled from 'styled-components';
interface Props {
  children: any;
}

export const AuthContextProvider = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [navigatorPosition, setNavigatorPosition] = useState<any>(null);
  const [companiesMockData, setCompaniesMockData] = useState<any>([]);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY);

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
      const accuracy = crd.accuracy;

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });
    fetch('https://api.npoint.io/c07c4cf6f0190a621db1')
      .then((data) => data.json())
      .then((data) => {
        data.map(async (item) => {
          const response = await Geocode.fromAddress(
            `${item.adress.name} ${item.adress.city} ${item.adress.postalCode}`
          );

          const { lat, lng } =
            response && response.results[0].geometry.location;

          const options = {
            id: item.id,
            companyName: item.companyName,
            vatNr: item.vatNr,
            phoneNumber: item.phoneNumber,
            email: item.email,
            image: item.image,
            openingHours: item.openingHours,
            adress: item.adress,
            coordinates: {
              lat,
              lng,
            },
          };
          setCompaniesMockData((prevState) => [...prevState, options]);
        });
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
      <FontWrapper>{props.children}</FontWrapper>
    </AuthContext.Provider>
  );
};
const FontWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;

  button {
    font-weight: bold;
  }
`;

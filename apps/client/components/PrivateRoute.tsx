import { AuthContext } from '../contexts/AuthContext';
import React, { useContext } from 'react';
import SignIn from '../pages/signin';

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    const { currentUser }: any = useContext(AuthContext);

    if (!currentUser) {
      return <SignIn />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;

import { AuthContext } from '@ctb/auth-context';
import React, { useContext } from 'react';
import Dashboard from '../pages/dashboard';

const LoginRoute = (Component) => {
  const Auth = (props) => {
    const { currentUser }: any = useContext(AuthContext);

    if (currentUser) {
      return <Dashboard />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default LoginRoute;

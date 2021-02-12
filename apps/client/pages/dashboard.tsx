import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '@ctb/auth-context';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/PrivateRoute';

interface Props {}

const dashboard = (props: Props) => {
  const { logout, currentUser }: any = useContext(AuthContext);
  const router = useRouter();

  const logoutUser = () => {
    router.push('/signin');
    logout();
  };

  return <div>{<Button onClick={logoutUser}>Logout</Button>}</div>;
};
export default PrivateRoute(dashboard);

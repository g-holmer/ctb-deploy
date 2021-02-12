import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';

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
export default withAuth(dashboard);

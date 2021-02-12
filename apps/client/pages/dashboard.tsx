import React, { useContext } from 'react';

import { AuthContext } from '@ctb/auth-context';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/PrivateRoute';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';
import styled from 'styled-components';
interface Props {}
const Dashboard = styled(Box)`
  min-height: 100vh;
`;

const dashboard = (props: Props) => {
  const { logout, currentUser }: any = useContext(AuthContext);
  const router = useRouter();

  const logoutUser = () => {
    router.push('/signIn');
    logout();
  };

  return <Dashboard>{<Button onClick={logoutUser}>Logout</Button>}</Dashboard>;
};
export default PrivateRoute(dashboard);

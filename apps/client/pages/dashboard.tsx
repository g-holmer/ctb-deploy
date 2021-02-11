import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface Props {}

const dashboard = (props: Props) => {
  const { logout, currentUser }: any = useContext(AuthContext);
  const router = useRouter();

  const logoutUser = () => {
    logout();
  };

  return (
    <div>{currentUser && <Button onClick={logoutUser}>Logout</Button>}</div>
  );
};
export default dashboard;

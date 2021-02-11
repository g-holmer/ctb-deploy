import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
interface Props {}

const dashboard = (props: Props) => {
  const { logout, currentUser }: any = useContext(AuthContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  console.log(currentUser);
  React.useEffect(() => {
    if (!currentUser && !currentUser) {
      router.push('/signin');
    }
  }, [currentUser]);
  const logoutUser = () => {
    logout();
    router.push('/signin');
  }; //yes no problem, but i gotta go now man, i will look at this later. yes ill push
 
  return (
    <div>{currentUser && <Button onClick={logoutUser}>Logout</Button>}</div>
  );
};
export default dashboard;

import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';
import { AuthContext } from '@ctb/auth-context';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import LoginRoute from '../components/LoginRoute';
interface Props {}

const SignIn = (props: Props) => {
  const [error, setError] = useState<string>('');
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
  });

  const { login, signInWithGoogle }: any = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const googleSignInHandler = () => {
    signInWithGoogle();
    router.push('/dashboard');
  };
  async function onSubmit(data) {
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch {
      setError('Wrong email or password.');
    }
  }
  const darkTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#4CADC0',
      },
      primary: {
        light: '#0066ff',
        main: '#0044ff',

        contrastText: '#ffcc00',
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <SignInBox>
        <Typography
          style={{ textAlign: 'center', margin: '12px' }}
          variant="h4"
        >
          Welcome
        </Typography>
        <RedirectMessage style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography style={{ textAlign: 'center' }}>
            No user account?
          </Typography>
          <Link href="/signUp">
            <a>Please register here</a>
          </Link>
        </RedirectMessage>
        <FormWrapper>
          <Form>
            <Typography variant="h5">Login With Google</Typography>
            <Button
              onClick={googleSignInHandler}
              style={{ padding: '8px', backgroundColor: 'gray' }}
            >
              <Typography style={{ textAlign: 'center' }}>
                Sign In With Google
              </Typography>
            </Button>
          </Form>
          <Divider orientation="vertical" flexItem />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Login With E-mail</Typography>
            <TextField
              style={{ marginTop: '10px' }}
              placeholder="E-mail"
              name="email"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>{errors.email?.message}</div>
            <TextField
              style={{ marginTop: '10px' }}
              placeholder="Password"
              name="password"
              type="password"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>{errors.password?.message}</div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <RedirectMessage>
              <Typography>Forgot your password?</Typography>
              <Link href="/forgotpassword">
                <a>Click Here</a>
              </Link>
            </RedirectMessage>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: '10px' }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </FormWrapper>
      </SignInBox>
    </ThemeProvider>
  );
};

const RedirectMessage = styled(Box)`
  display: flex;
  margin: 10px;
  a {
    display: flex;
    align-items: center;
    margin-left: 4px;
    text-decoration: none;
  }
`;
const Form = styled.form`
  display: flex;

  flex-direction: column;
`;
const SignInBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;
const FormWrapper = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`;

export default LoginRoute(SignIn);

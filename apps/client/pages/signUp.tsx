import React, { useContext } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AuthContext } from '@ctb/auth-context';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {}

const signUp = (props: Props) => {
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
    confirmPassword: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { signup, signInWithGoogle }: any = useContext(AuthContext);
  const googleSignInHandler = () => {
    signInWithGoogle();
    router.push('/dashboard');
  };
  async function onSubmit(data) {
    try {
      await signup(data.email, data.password);
      router.push('/signin');
    } catch {}
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
      <SignIn>
        <Typography
          style={{ textAlign: 'center', margin: '12px' }}
          variant="h4"
        >
          Create Account
        </Typography>
        <RedirectMessage style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography style={{ textAlign: 'center' }}>
            Already have an account?
          </Typography>
          <Link href="/signIn">
            <a>Login here</a>
          </Link>
        </RedirectMessage>
        <FormWrapper>
          <Form>
            <Typography variant="h5">Register With Google</Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={googleSignInHandler}
              style={{ padding: '8px', backgroundColor: 'gray' }}
            >
              <Typography style={{ textAlign: 'center' }}>
                Sign Up With Google
              </Typography>
            </Button>
          </Form>
          <Divider orientation="vertical" flexItem />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Register With E-mail</Typography>
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
            <TextField
              style={{ marginTop: '10px' }}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>
              {errors.confirmPassword?.message}
            </div>

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
      </SignIn>
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
const SignIn = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;
const FormWrapper = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`;
export default signUp;

import React from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Marquee, { Motion, randomIntFromInterval } from 'react-marquee-slider';

import Image from 'next/image';
const images = [
  {
    id: 0,
    imgSrc: '/img/marquee/caribou-cafe.png',
  },
  {
    id: 1,
    imgSrc: '/img/marquee/dunkin.png',
  },
  {
    id: 2,
    imgSrc: '/img/marquee/espressohouse.png',
  },
  {
    id: 3,
    imgSrc: '/img/marquee/Starbucks_Corporation_Logo_2011.svg.png',
  },
  {
    id: 4,
    imgSrc: '/img/marquee/tim hortons.png',
  },
  {
    id: 5,
    imgSrc: '/img/marquee/waynescoffee.svg',
  },
];

interface Props {}

const homePage = (props: Props) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#4CADC0',
      },
      type: 'dark',
    },
  });
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

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {};
  return (
    <ThemeProvider theme={darkTheme}>
      <Home>
        <Hero>
          <OnboardingMessage>
            <Typography variant="h4">Find a café - order on the go!</Typography>
          </OnboardingMessage>
          <SearchBox>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-basic"
                label="Enter café"
                variant="outlined"
                style={{ marginTop: '10px' }}
                name="email"
                inputRef={register({ required: true })}
              />
              <div style={{ color: 'red' }}>{errors.email?.message}</div>
              <TextField
                style={{ marginTop: '10px' }}
                id="outlined-basic"
                label="Enter city, location or area"
                variant="outlined"
                name="password"
                type="text"
                inputRef={register({ required: true })}
              />
              <div style={{ color: 'red' }}>{errors.password?.message}</div>

              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: '10px' }}
                type="submit"
              >
                Search café
              </Button>
            </Form>
          </SearchBox>
        </Hero>
        <OnboardingContent>
          <OnboardingText>
            <Typography variant="h5">Save time and money</Typography>
            <Typography style={{ fontSize: '12px' }}>
              Instead of staying in queue to visit your favourite café you can
              nice and easy book your table and enjoy your coffee served when
              you arrive at the café. With discount code ILOVECOFFEE get a 50%
              discount at your first reservation.
            </Typography>
          </OnboardingText>
          <ImgWrapper>
            <Image
              src="/img/queue.jpg"
              alt="Picture of the author"
              width={500}
              height={350}
            />
          </ImgWrapper>
        </OnboardingContent>

        <Marquee velocity={120} resetAfterTries={50}>
          {images.map((item) => (
            <Motion key={`child-${item.id}`} velocity={0} radius={150}>
              <ImageWrapper>
                <Image src={item.imgSrc} layout="fill" objectFit="contain" />
              </ImageWrapper>
            </Motion>
          ))}
        </Marquee>
      </Home>
    </ThemeProvider>
  );
};
const Hero = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: url('/img/hero/coffee-hero.jpg') no-repeat center;
  background-size: cover;
  max-width: 100vw;
  min-height: 470px;
  @media (min-width: 768px) {
    min-height: 44vw;
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;
const Form = styled.form`
  display: flex;
  input,
  button {
    margin-top: 4px;
  }
  flex-direction: column;
`;

const Home = styled(Box)`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #c8dbe1;
  position: relative;
`;

const OnboardingText = styled(Box)`
  max-width: 400px;
  margin: 0 30px 30px 0;
`;

const OnboardingMessage = styled(Box)`
  margin: 30px;
`;
const OnboardingContent = styled(Box)`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5vw 5vw 0 5vw;
  @media (min-width: 1040px) {
    justify-content: space-between;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 100px;
`;
const SearchBox = styled(Box)`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background: #333333;
  color: white;
  padding: 20px;
  border-radius: 30px;
`;
const ImgWrapper = styled.div`
  filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.6));
`;
export default homePage;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

import Marquee, { Motion } from 'react-marquee-slider';
import Image from 'next/image';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';

import { SearchBoxComponent } from '@ctb/search-box-component';
import { AuthContext } from '@ctb/auth-context';
import OnboardingCard from '../components/OnboardingCard';

interface Props {}

const homePage = (props: Props) => {
  const { companiesMockData }: any = useContext(AuthContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <Home>
        <Hero>
          <OnboardingMessage>
            <Typography variant="h4">Find a café - order on the go!</Typography>
          </OnboardingMessage>
          <SearchBoxComponent isHeader={false} />
        </Hero>
        <OnboardingContent>
          <OnboardingCard />
          <OnboardingRight>
            <OnboardingText>
              <Typography variant="h5">Connect your Café</Typography>
              <Typography style={{ fontSize: '14px' }}>
                We help 9 different service entrepreneurs with booking, payment
                and marketing for their café or restaurant. Try and see how we
                can <a>help</a> you! Do you rather want to talk to an employee?
                Call 0772-111 111
              </Typography>
            </OnboardingText>
            <ImgWrapper>
              <Image
                src="/static/img/restaurantbusinesss.jpg"
                alt="Picture of the author"
                width={570}
                height={370}
              />
            </ImgWrapper>
          </OnboardingRight>
        </OnboardingContent>
        <div style={{ marginTop: 50 }}>
          <Marquee velocity={30} resetAfterTries={50}>
            {companiesMockData &&
              companiesMockData.map((item) => (
                <Motion key={`child-${item.id}`} velocity={0} radius={100}>
                  <ImageWrapper>
                    <Image
                      src={item.image}
                      alt="Picture of the author"
                      width={570}
                      height={370}
                    />
                  </ImageWrapper>
                </Motion>
              ))}
          </Marquee>
        </div>
      </Home>
    </ThemeProvider>
  );
};
const OnboardingRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  @media (min-width: 930px) {
    margin-top: 0;
    margin-left: 100px;
  }
`;
const Hero = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: url('/static/img/hero/coffee-hero.jpg') no-repeat center;
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

const Home = styled(Box)`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #c8dbe1;
  position: relative;
`;

const OnboardingText = styled(Box)`
  background: white;
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
  border-radius: 4px;
  border: 1px solid gold;
  padding: 20px;

  margin: 0 0 50px 0;
  max-width: 100%;
  @media (min-width: 480px) {
    max-width: 500px;
  }
  @media (min-width: 708px) {
    margin-bottom: 90px;
  }
`;

const OnboardingMessage = styled(Box)`
  margin: 30px;
`;
const OnboardingContent = styled(Box)`
  /* flex-wrap: wrap; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5vw 5vw 0 5vw;
  @media (min-width: 930px) {
    margin: 5vw 15vw 0 15vw;
    justify-content: space-between;
    flex-direction: row;
  }
`;
const ImageWrapper = styled.div`
  background-size: contain;
  position: relative;

  img {
    border-radius: 4px;
    width: 130px;
    height: 100px;
    @media (min-width: 768px) {
      width: 170px;
      height: 130px;
    }
  }
`;

const ImgWrapper = styled.div`
  filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.6));
  img {
    border-radius: 4px;
  }
`;
export default homePage;

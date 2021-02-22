import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

import Marquee, { Motion } from 'react-marquee-slider';
import Image from 'next/image';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';

import { SearchBoxComponent } from '@ctb/search-box-component';
import { AuthContext } from '@ctb/auth-context';

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
              src="/static/img/queue.jpg"
              alt="Picture of the author"
              width={640}
              height={380}
            />
          </ImgWrapper>
        </OnboardingContent>

        <Marquee velocity={20} resetAfterTries={50}>
          {companiesMockData &&
            companiesMockData.map((item) => (
              <Motion key={`child-${item.id}`} velocity={0} radius={100}>
                <ImageWrapper>
                  <Image src={item.image} layout="fill" objectfit="contain" />
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

const ImgWrapper = styled.div`
  filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.6));
`;
export default homePage;

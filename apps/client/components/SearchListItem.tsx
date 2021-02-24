import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  companyName: string;
  vatNr: string;
  phoneNumber: string;
  email: string;
  image: string;
  openingHours: any;
  adress: any;
  distance: number;
}

const SearchListItem = (props: Props) => {
  return (
    <ListItem>
      <ImageWrapper>
        <Image src={props.image} height="150" width="150" objectfit="contain" />
      </ImageWrapper>
      <ListItemDetails>
        <Typography variant="h5">{props.companyName}</Typography>
        <Typography>
          {props.adress.name} {props.adress.postalCode} {props.adress.city}
        </Typography>
        {props.openingHours ? (
          <Box color="success.main">
            <Typography>
              Open ({props.openingHours.open}-{props.openingHours.closed})
            </Typography>
          </Box>
        ) : (
          <Box color="error.main">
            <Typography>Closed</Typography>
          </Box>
        )}
      </ListItemDetails>
      {props.distance && <Box>{props.distance} meters away</Box>}
      <Image
        src={'/static/angle-right.svg'}
        height="20"
        width="20"
        objectfit="contain"
      />
    </ListItem>
  );
};
const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  img {
    border-radius: 4px;
  }
  align-items: center;
  width: 150px;
  height: 150px;
`;

const ListItem = styled(Box)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.6));
  transition: all 0.1s ease-in;
`;
const ListItemDetails = styled(Box)`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export default SearchListItem;

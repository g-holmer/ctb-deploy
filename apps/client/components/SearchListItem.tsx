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
  console.log(props.image);

  return (
    <ListItem>
      <ImageWrapper>
        <Image src={props.image} layout="fill" objectfit="contain" />
      </ImageWrapper>
      <ListItemDetails>
        <Typography variant="h5">{props.companyName}</Typography>
        <Typography>
          {props.adress.name} {props.adress.postalCode} {props.adress.city}
        </Typography>
        <Typography color="secondary">Closed</Typography>
      </ListItemDetails>
    </ListItem>
  );
};
const ImageWrapper = styled.div`
  clip-path: circle(50%);
  position: relative;
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
const ListItem = styled(Box)`
  cursor: pointer;
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.6));
`;
const ListItemDetails = styled(Box)`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export default SearchListItem;

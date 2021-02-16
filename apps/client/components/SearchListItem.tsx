import React from 'react';
import { Box } from '@material-ui/core';
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
    <Box>
      <Image src={props.image} layout="fill" objectfit="contain" />
    </Box>
  );
};

export default SearchListItem;

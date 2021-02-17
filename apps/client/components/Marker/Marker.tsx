import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Typography, Box } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  companyName: string;
  phoneNumber: string;
  image: string;
  openingHours: any;
  adress: any;
  distance: number;
}
const Marker = (props: Props) => {
  const node = React.useRef();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickOutside = (e) => {
    let nodeCheck = null;
    nodeCheck = node.current;
    if (nodeCheck && nodeCheck.contains(e.target)) {
      return;
    }

    setIsOpen(false);
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <MarkerWrapper onClick={() => setIsOpen(!isOpen)}>
        <InnerMarker />
      </MarkerWrapper>
      {isOpen && (
        <Card ref={node}>
          <ImageWrapper>
            <Image src={props.image} layout="fill" objectfit="contain" />
          </ImageWrapper>
          <ListItemDetails>
            <Typography variant="h6">{props.companyName}</Typography>
            <Typography>
              {props.adress.name} {props.adress.postalCode} {props.adress.city}
            </Typography>
            <Typography color="secondary">Closed</Typography>
          </ListItemDetails>
          {props.distance && <Box>{props.distance} meters away</Box>}
          <Image
            src={'/angle-right.svg'}
            height="20"
            width="20"
            objectfit="contain"
          />
        </Card>
      )}
    </>
  );
};
const ImageWrapper = styled.div`
  clip-path: circle(50%);
  position: relative;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
const ListItemDetails = styled(Box)`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Card = styled(Box)`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.6));
  transition: all 0.1s ease-in;
`;
const MarkerWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  clip-path: circle(50%);
  position: relative;
  background: #1f331d;
  width: 40px;
  background-color: rgba(76, 173, 192, 0.1);

  height: 40px;
  object-fit: contain;
`;
const InnerMarker = styled.div`
  clip-path: circle(50%);
  position: relative;
  background: rgba(76, 173, 192, 1);
  width: 15px;

  height: 15px;
`;

export default Marker;

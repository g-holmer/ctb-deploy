import React, { useState } from 'react';

import styled from 'styled-components';
import MarkerCard from './MarkerCard';

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
        <MarkerCard
          node={node}
          key={props.id}
          companyName={props.companyName}
          phoneNumber={props.phoneNumber}
          adress={props.adress}
          image={props.image}
          openingHours={props.openingHours}
          //   distance={navigatorPosition && getDistance(item)} !! DON'T FORGET TO UNCOMMENT THIS LATER!!
          distance={500} //temporarily
        />
      )}
    </>
  );
};

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

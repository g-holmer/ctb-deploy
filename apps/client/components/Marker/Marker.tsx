import React, { useState } from 'react';

import styled from 'styled-components';
import MarkerCard from './MarkerCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {
  companyName: string;
  phoneNumber: string;
  image: string;
  openingHours: any;
  adress: any;
  distance: number;
  lat: number;
  lng: number;
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
      <StyledTransitionGroup>
        {isOpen && (
          <CSSTransition timeout={300} classNames="alert" unmountOnExit>
            <MarkerCard
              node={node}
              companyName={props.companyName}
              phoneNumber={props.phoneNumber}
              adress={props.adress}
              image={props.image}
              distance={props.distance}
              openingHours={props.openingHours}
            />
          </CSSTransition>
        )}
      </StyledTransitionGroup>
    </>
  );
};
const StyledTransitionGroup = styled(TransitionGroup)`
  .alert-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .alert-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .alert-exit {
    opacity: 1;
  }
  .alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
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

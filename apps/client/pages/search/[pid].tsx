import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Geocode from 'react-geocode';
import GoogleMapReact from 'google-map-react';
import { AuthContext } from '@ctb/auth-context';
// import 'google-map-react/dist/index.css'

// import LOS_ANGELES_CENTER from './const/la_center';

// import Marker from './components/Marker';

const Wrapper = styled.main`
  width: 700px;
  height: 700px;
  float: right;
`;

const App = () => {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY);
  Geocode.fromAddress('Odengatan 94A Stockholm').then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  const [places, setPlaces] = useState([]);
  const {
    navigatorPosition,
    setNavigatorPosition,
    triggerNavigator,
    companiesMockData,
  }: any = useContext(AuthContext);
  console.log(companiesMockData);

  useEffect(() => {
    triggerNavigator();
  }, []);
  //   const fetchPlaces = async () => {
  //     fetch('places.json')
  //       .then((response) => response.json())
  //       .then((data) => setPlaces(data.results));
  //   };

  //   useEffect(() => {
  //     fetchPlaces();
  //   }, []);

  //   if (!places || places.length === 0) {
  //     return null;
  //   }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {companiesMockData &&
          companiesMockData.map((item) => {
            <p>{item.companyName}</p>;
          })}
      </div>
      <Wrapper>
        {navigatorPosition && (
          // <GoogleMapReact
          //   bootstrapURLKeys={{
          //     key: process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY,
          //   }}
          //   defaultZoom={13}
          //   defaultCenter={[navigatorPosition.lat, navigatorPosition.lng]}
          // >
          //   {/* {places.map((place) => (
          //     <Marker
          //       key={place.id}
          //       text={place.name}
          //       lat={place.geometry.location.lat}
          //       lng={place.geometry.location.lng}
          //     />
          //   ))} */}
          // </GoogleMapReact>
          <div></div>
        )}
      </Wrapper>
    </>
  );
};

export default App;

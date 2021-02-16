import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import GoogleMapReact from 'google-map-react';
import { AuthContext } from '@ctb/auth-context';
import { Box } from '@material-ui/core';
import * as geolib from 'geolib';
import SearchListItem from 'apps/client/components/SearchListItem';
import { useRouter } from 'next/router';
// import 'google-map-react/dist/index.css'

// import LOS_ANGELES_CENTER from './const/la_center';

// import Marker from './components/Marker';

const App = () => {
  const [places, setPlaces] = useState([]);
  const {
    navigatorPosition,
    setNavigatorPosition,
    triggerNavigator,
    companiesMockData,
  }: any = useContext(AuthContext);
  const router = useRouter();
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

  const getDistance = (item) => {
    return geolib.getDistance(
      {
        latitude: navigatorPosition.lat,
        longitude: navigatorPosition.lng,
      },
      {
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng,
      }
    );
  };

  const filteredData =
    companiesMockData &&
    companiesMockData.filter((item) => {
      return item.companyName
        .toLowerCase()
        .includes(router.query.pid.toLowerCase());
    });

  return (
    <Search>
      <SearchList>
        {filteredData &&
          filteredData.map((item) => {
            return (
              <SearchListItem
                companyName={item.companyName}
                vatNr={item.vatNr}
                phoneNumber={item.phoneNumber}
                email={item.email}
                image={item.image}
                openingHours={item.openingHours}
                adress={item.adress}
                distance={navigatorPosition && getDistance(item)}
                key={item.id}
              />
            );
          })}
      </SearchList>
      <Wrapper>
        {navigatorPosition && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY,
            }}
            defaultZoom={13}
            defaultCenter={[navigatorPosition.lat, navigatorPosition.lng]}
          >
            {/* {places.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
              />
            ))} */}
          </GoogleMapReact>
        )}
      </Wrapper>
    </Search>
  );
};
const Search = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-top: 86px;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #c8dbe1;
`;
const SearchList = styled(Box)`
  margin: 4vw;
`;
const Wrapper = styled.div`
  position: fixed;
  width: 700px;
  height: 700px;
  float: right;
  right: 0;
`;
export default App;

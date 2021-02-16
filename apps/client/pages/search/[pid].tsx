import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import { AuthContext } from '@ctb/auth-context';
import {
  Box,
  FormControl,
  FormHelperText,
  NativeSelect,
  MenuItem,
  InputLabel,
  Typography,
} from '@material-ui/core';
import * as geolib from 'geolib';
import SearchListItem from 'apps/client/components/SearchListItem';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ctb/theme-provider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { SearchBoxComponent } from '@ctb/search-box-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import 'google-map-react/dist/index.css'

// import LOS_ANGELES_CENTER from './const/la_center';

// import Marker from './components/Marker';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const App = () => {
  const isDesktop = useMediaQuery('(min-width:768px)');

  const [age, setAge] = React.useState<string>('');
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
    <ThemeProvider theme={theme}>
      {!isDesktop && <SearchBoxComponent isHeader={false} />}
      <Search>
        <SearchList>
          <SearchListTop>
            <FormControl>
              <InputLabel id="demo-simple-select">Filter</InputLabel>
              <NativeSelect
                value={age}
                onChange={(e) => setAge(e.target.value)}
                inputProps={{
                  name: 'age',
                  id: 'age-native-helper',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                margin: '0',
              }}
            >
              {filteredData.length} hits
            </Typography>
          </SearchListTop>
          <StyledTransitionGroup>
            {filteredData &&
              filteredData.map((item) => {
                return (
                  <CSSTransition key={item.id} timeout={500} classNames="item">
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
                  </CSSTransition>
                );
              })}
          </StyledTransitionGroup>
        </SearchList>
        {/* <Wrapper>
          {navigatorPosition && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY,
              }}
              defaultZoom={13}
              defaultCenter={[navigatorPosition.lat, navigatorPosition.lng]}
            >
              {places.map((place) => (
                <Marker
                  key={place.id}
                  text={place.name}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                />
              ))}
            </GoogleMapReact>
          )}
        </Wrapper> */}
      </Search>
    </ThemeProvider>
  );
};
const StyledTransitionGroup = styled(TransitionGroup)`
  .remove-btn {
    margin-right: 0.5rem;
  }

  .item-enter {
    opacity: 0;
  }
  .item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .item-exit {
    opacity: 1;
  }
  .item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;
const Search = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 86px;

  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #c8dbe1;
`;
const SearchList = styled(Box)`
  min-width: 300px;
  width: 40%;
  margin: 1rem 3em 0 3em;
`;
const SearchListTop = styled(Box)`
  display: flex;

  justify-content: space-between;
  margin: 10px 10px 50px 10px;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 700px;

  height: 700px;
  right: 0;
`;
export default App;

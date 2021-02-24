import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { AuthContext } from '@ctb/auth-context';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image';
function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));
/* eslint-disable-next-line */
export interface AutoCompleteInputProps {
  isHeader: string;
  inputValue: any;
  setInputValue: any;
  pid: string;
  type: string;
}
interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

export function AutoCompleteInput(props: AutoCompleteInputProps) {
  const { navigatorPosition, triggerNavigator }: any = useContext(AuthContext);
  const classes = useStyles();
  const inputValue = props.inputValue;
  const setInputValue = props.setInputValue;
  const [value, setValue] = React.useState<PlaceType | null>({
    description: props.type === 'location' ? props.pid : '',
    structured_formatting: {
      main_text: 'Surat',
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text: 'Gujarat, India',
    },
  });

  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const Link = ({ children, ...other }) => {
    const handleClick = () => {
      setValue({
        description: 'Check my position',
        structured_formatting: {
          main_text: 'Surat',
          main_text_matched_substrings: [
            {
              length: 1,
              offset: 0,
            },
          ],
          secondary_text: 'Gujarat, India',
        },
      });

      triggerNavigator();
    };

    return (
      <Paper {...other}>
        <MyLocationWrapper
          isheader={props.isHeader}
          onTouchStart={handleClick}
          onMouseDown={handleClick}
          onClick={handleClick}
        >
          <ImageWrapper>
            <Image
              src="/static/arrow-nav.svg"
              layout="fill"
              objectfit="contain"
            />
          </ImageWrapper>
          <p>Check my position</p>
        </MyLocationWrapper>
        {children}
      </Paper>
    );
  };
  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <StyledAutoComplete
      isheader={props.isHeader}
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      noOptionsText={''}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter city, location or area"
          variant="outlined"
          fullWidth
        />
      )}
      PaperComponent={Link}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
const StyledAutoComplete = styled(Autocomplete)`
  margin: ${(props) =>
    props.isheader === 'true' ? '0 0 0 10px' : '10px 0 0 0'};
`;
const ImageWrapper = styled.div`
  margin: 14px;
  position: relative;
  align-self: center;
  height: 27px;
  width: 27px;
`;
const MyLocationWrapper = styled.div`
  cursor: pointer;
  display: flex;

  &:hover {
    background: ${(props) =>
      props.isheader === 'true' ? '#555555' : '#e4e4e4'};
  }
`;
export default AutoCompleteInput;

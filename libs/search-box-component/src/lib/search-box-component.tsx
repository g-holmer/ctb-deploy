import styled from 'styled-components';
import React, { useContext } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ctb/theme-provider';
import { darkTheme } from '@ctb/dark-theme-provider';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@ctb/auth-context';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { AutoCompleteInput } from '@ctb/auto-complete';
import Paper from '@material-ui/core/Paper';
export interface Props {
  isHeader: boolean;
}
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const SearchBoxComponent = (props: Props) => {
  const classes = useStyles();
  const router = useRouter();

  const isSearch: string = router.pathname.includes('/search')
    ? 'true'
    : 'false';

  const { register, handleSubmit, watch, errors } = useForm({});

  const { navigatorPosition, triggerNavigator }: any = useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState('');
  const isDesktop = useMediaQuery('(min-width:768px)');
  const onSubmit = (data) => {
    if (inputValue) {
      router.push(`/search/[...slug]`, `/search/${inputValue}/location`);
    } else {
      router.push(`/search/[...slug]`, `/search/${data.cafe}/cafe`);
    }
  };
  const isHeader: string = props.isHeader ? 'true' : 'false';
  const pid = router.query.slug && router.query.slug[0];
  const type = router.query.slug && router.query.slug[1];
  const renderSearchBox = (
    <SearchBox
      isheader={isHeader}
      elevation={3}
      issearch={isSearch}
      className={classes.root}
    >
      <>
        <Form isheader={isHeader} onSubmit={handleSubmit(onSubmit)}>
          <TextFieldWrapper isheader={isHeader}>
            <TextField
              style={{ minWidth: '242.5px' }}
              id="outlined-basic"
              label="Enter café"
              defaultValue={type === 'cafe' ? pid : ''}
              variant="outlined"
              name="cafe"
              inputRef={register()}
            />

            <AutoCompleteInput
              pid={pid}
              type={type}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isHeader={isHeader}
            />
          </TextFieldWrapper>
          {/* <div style={{ color: 'red' }}>{errors.email?.message}</div> */}

          <Button
            style={{
              margin: '10px',
              width: '242.5px',
              height: '56px',
              alignSelf: 'center',
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Search café
          </Button>
        </Form>
      </>
    </SearchBox>
  );
  return (
    <ThemeProvider
      theme={props.isHeader || isSearch === 'true' ? darkTheme : theme}
    >
      {isSearch === 'true' && isDesktop
        ? renderSearchBox
        : !props.isHeader && renderSearchBox}
    </ThemeProvider>
  );
};

export const SearchBox = styled(Paper)`
  display: flex;

  flex-direction: column;
  min-width: 300px;
  background: ${(props) =>
    props.issearch === 'true' ? '#111 !important' : '#7e7e7e'};

  color: white;
  padding: ${(props) => (props.isheader === 'true' ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isheader === 'true' ? '10px' : '0')};
  border-radius: ${(props) => (props.issearch === 'true' ? '0' : '12px')};
  box-shadow: ${(props) =>
    props.isheader === 'false'
      ? 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
      : '0'};
`;
export const TextFieldWrapper = styled.div`
  margin-left: ${(props) => (props.isheader === 'true' ? '10px' : '0')};
  display: flex;

  flex-direction: ${(props) => (props.isheader === 'true' ? 'row' : 'column')};

  input {
    width: 90% !important;
  }
  @media (min-width: 768px) {
    max-width: 500px;
  }
`;
export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: ${(props) =>
      props.isheader === 'true' ? 'row' : 'column'};
    max-width: 830px;
    justify-content: flex-start;
  }
`;

export default SearchBoxComponent;

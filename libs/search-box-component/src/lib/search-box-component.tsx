import styled from 'styled-components';
import React, { useContext } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ctb/dark-theme-provider';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@ctb/auth-context';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AutoCompleteInput } from '@ctb/auto-complete';
export interface Props {
  isHeader: boolean;
}

export const SearchBoxComponent = (props: Props) => {
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

  const renderSearchBox = (
    <SearchBox isheader={isHeader} issearch={isSearch}>
      <>
        <Form isheader={isHeader} onSubmit={handleSubmit(onSubmit)}>
          <TextFieldWrapper isheader={isHeader}>
            <TextField
              id="outlined-basic"
              label="Enter café"
              defaultValue={router.query.pid}
              variant="outlined"
              name="cafe"
              inputRef={register()}
            />

            <AutoCompleteInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              isHeader={isHeader}
            />
          </TextFieldWrapper>
          {/* <div style={{ color: 'red' }}>{errors.email?.message}</div> */}
          <p>
            {navigatorPosition
              ? navigatorPosition.lat + navigatorPosition.lng
              : 'no positon'}
          </p>
          <Button
            style={{
              margin: '10px',
              width: '230px',
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
    <ThemeProvider theme={theme}>
      {isSearch === 'true' && isDesktop
        ? renderSearchBox
        : !props.isHeader && renderSearchBox}
    </ThemeProvider>
  );
};

export const SearchBox = styled(Box)`
  display: flex;

  flex-direction: column;
  min-width: 300px;
  background: ${(props) => (props.issearch === 'true' ? '#111' : '#333333')};

  color: white;
  padding: ${(props) => (props.isheader === 'true' ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isheader === 'true' ? '10px' : '0')};
  border-radius: ${(props) => (props.issearch === 'true' ? '0' : '30px')};
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
    max-width: 740px;
    justify-content: flex-start;
  }
`;

export default SearchBoxComponent;

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

  const isSearch = router.pathname.includes('/search');
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

  const renderSearchBox = (
    <SearchBox isHeader={props.isHeader} isSearch={isSearch}>
      <>
        <Form isHeader={props.isHeader} onSubmit={handleSubmit(onSubmit)}>
          <TextFieldWrapper isHeader={props.isHeader}>
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
              isHeader={props.isHeader}
            />
          </TextFieldWrapper>
          {/* <div style={{ color: 'red' }}>{errors.email?.message}</div> */}

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
      {isSearch && isDesktop
        ? renderSearchBox
        : !props.isHeader && renderSearchBox}
    </ThemeProvider>
  );
};

export const SearchBox = styled(Box)`
  display: flex;

  flex-direction: column;
  min-width: 300px;
  background: ${(props) => (props.isSearch ? '#111' : '#333333')};

  color: white;
  padding: ${(props) => (props.isHeader ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isHeader ? '10px' : '0')};
  border-radius: ${(props) => (props.isSearch ? '0' : '30px')};
`;
export const TextFieldWrapper = styled.div`
  margin-left: ${(props) => (props.isHeader ? '10px' : '0')};
  display: flex;

  flex-direction: ${(props) => (props.isHeader ? 'row' : 'column')};

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
    flex-direction: ${(props) => (props.isHeader ? 'row' : 'column')};
    max-width: 740px;
    justify-content: flex-start;
  }
`;

export default SearchBoxComponent;

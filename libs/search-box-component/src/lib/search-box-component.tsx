import styled from 'styled-components';
import React, { useContext } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ctb/dark-theme-provider';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@ctb/auth-context';
export interface Props {
  isHeader: boolean;
}

export const SearchBoxComponent = (props: Props) => {
  const router = useRouter();

  const isSearch = router.pathname.includes('/search');
  const { register, handleSubmit, watch, errors } = useForm({});

  const { navigatorPosition, triggerNavigator }: any = useContext(AuthContext);

  const onSubmit = (data) => {
    router.push({
      pathname: '/search/[pid]',
      query: { pid: data.cafe },
    });
  };

  const renderSearchBox = (
    <SearchBox isHeader={props.isHeader}>
      <>
        <Form isHeader={props.isHeader} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ width: '230px', margin: '10px' }}
            id="outlined-basic"
            label="Enter café"
            variant="outlined"
            name="cafe"
            inputRef={register()}
          />
          {/* <div style={{ color: 'red' }}>{errors.email?.message}</div> */}
          <TextField
            style={{ width: '230px', margin: '10px' }}
            id="outlined-basic"
            label="Enter city, location or area"
            variant="outlined"
            name="location"
            type="text"
            onFocus={() => !navigatorPosition && triggerNavigator()}
            inputRef={register()}
          />
          {/* <div style={{ color: 'red' }}>{errors.password?.message}</div> */}

          <Button
            style={{ margin: '10px' }}
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
      {isSearch ? renderSearchBox : !props.isHeader && renderSearchBox}
    </ThemeProvider>
  );
};
export const SearchBox = styled(Box)`
  display: flex;

  flex-direction: column;
  min-width: 300px;
  background: ${(props) => (props.isHeader ? 'inherit' : '#333333')};

  color: white;
  padding: ${(props) => (props.isHeader ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isHeader ? '10px' : '0')};
  border-radius: 30px;
`;
export const Form = styled.form`
  display: flex;

  flex-direction: ${(props) => (props.isHeader ? 'row' : 'column')};
`;

export default SearchBoxComponent;

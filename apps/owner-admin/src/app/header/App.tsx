import React from 'react';
import { Header } from '@ctb/header';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;

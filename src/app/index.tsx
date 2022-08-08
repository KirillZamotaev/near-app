import { FC } from 'react';

import { Routing } from 'routing';
import { useWalletConnect } from 'features/wallet';

import './App.css';

export const App: FC = () => {
  useWalletConnect();

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

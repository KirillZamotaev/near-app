import { notification } from 'antd';
import { WalletApi } from 'features/wallet/walletApi';
import { FC } from 'react';
import { Routing } from 'routing';

import './App.css';

window.Buffer = window.Buffer || require("buffer").Buffer;

notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});


WalletApi.initContract();

export const App: FC = () => {

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

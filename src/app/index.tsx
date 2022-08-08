import { notification } from 'antd';
import { useWallet } from 'features/wallet';
import { FC } from 'react';
import { Routing } from 'routing';

import './App.css';

notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});

export const App: FC = () => {

  useWallet();

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

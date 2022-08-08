import { notification } from 'antd';
import { useWallet } from 'features/wallet';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
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

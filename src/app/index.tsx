import { notification } from 'antd';
import { FC } from 'react';

import { Routing } from 'routing';

import './App.css';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});

export const App: FC = () => {

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

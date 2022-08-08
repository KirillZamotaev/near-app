import { FC } from 'react';
import { store } from 'store';
import { Provider } from 'react-redux';
import './App.css';

import { Routing } from 'routing';

export const App: FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Routing />
      </Provider>
    </div>
  );
};

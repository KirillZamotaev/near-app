import { configureStore } from '@reduxjs/toolkit'
import walletReducer from 'features/wallet/reducer'
import userReducer from 'features/user/reducer'
import marketReducer from 'features/market/reducer';

export type State = typeof store;

export const store = configureStore({
  reducer: {
    walletReducer,
    userReducer,
    marketReducer,
  },
})

export const selectSelf = (state: RootState) => state;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WalletApi } from './walletApi'; 

export const connectWallet = createAsyncThunk('wallet/connect', async () => {
    const response = await WalletApi.connect();
    return response
})

console.log('WalletApi', WalletApi);

export interface WalletInfo {
    [key: string]: any
}

export interface UserState {
    isLoading: boolean;
    isError: boolean; 
    isConnected: boolean;
    data: any;
}

const initialState: UserState = {
    isLoading: false,
    isError: false,
    isConnected: false,
    data: null,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectWallet.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(connectWallet.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isConnected = true
    })
    builder.addCase(connectWallet.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
})

export default walletSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WalletApi } from './walletApi'; 

export const connectWallet = createAsyncThunk('wallet/connect', async () => {
    const response = await WalletApi.initContract();
    return response
})

export const getWalletData = createAsyncThunk('wallet/data', async () => {
  const address = WalletApi.getAddress();
  const balance = await WalletApi.getDeposit();
  return {
    balance,
    address,
  }
})

export interface WalletInfo {
    [key: string]: any
}

export interface UserState {
    isLoading: boolean;
    isError: boolean; 
    isConnected: boolean;
    data: any;
    deposit: any;
}

const initialState: UserState = {
    isLoading: false,
    isError: false,
    isConnected: false,
    data: null,
    deposit: null,
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
    builder.addCase(getWalletData.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getWalletData.fulfilled, (state, { payload }) => {
      state.deposit = payload;
      state.isConnected = true
    })
    builder.addCase(getWalletData.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
})

export default walletSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WalletApi } from './walletApi'; 

export const connectWallet = createAsyncThunk('wallet/connect', async () => {
    const response = await WalletApi.connect();
    return response
})

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
  
  reducers: {
    signIn: (state) => {
        state.isLoading = true;
    },
    signInSuccess: (state, { payload }: PayloadAction) => {
        state.data = payload;
    },
    signInFail: (state) => {
      state.isError = true;
    },
    reset: (state) => {
        state = initialState;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(connectWallet.pending, (state, { payload }) => {
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

// Action creators are generated for each case reducer function
export const { signIn, signInSuccess, signInFail } = walletSlice.actions

export default walletSlice.reducer
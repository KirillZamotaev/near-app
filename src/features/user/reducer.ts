import { createSlice } from '@reduxjs/toolkit'
import { WalletApi } from 'features/wallet/walletApi';

export interface WalletInfo {
    [key: string]: any
}

export interface UserState {
    data: Record<string, string>;
    isSignedIn: boolean;
}

const initialState: UserState = {
    data: {},
    isSignedIn: false,
}

export const walletSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
        state.data = payload;
        state.isSignedIn = true;
    },
    signOut: (state) => {
        state = initialState;
    },
    // signInSuccess: (state, { payload }: PayloadAction) => {
    //     state.isSignedIn = true;
    // },
    // signInFail: (state) => {
    //   state.isSignedIn = false;
    // },
    // reset: (state) => {
    //     state = initialState;
    // },  
  }
})

export const { signIn, signOut } = walletSlice.actions

export default walletSlice.reducer
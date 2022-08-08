import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WalletApi } from 'features/wallet/walletApi';

export interface WalletInfo {
  [key: string]: any;
}

export interface UserState {
  data: any;
  isLoading: boolean;
  contractData: any;
  isSignedIn: boolean;
}

const initialState: UserState = {
  data: {},
  isLoading: false,
  contractData: {},
  isSignedIn: false,
};

export const signIn = createAsyncThunk('user/signing', async (values: Record<string, string | number>) => {
  await new Promise((res) => {
    setTimeout(() => res(1), 2000);
  });
  const response = await WalletApi.requestSingIn(values);
  return response;
});


export const signInCheck = createAsyncThunk('user/signing', async () => {
    const isSignedIn = WalletApi.checkSignIn();

    return isSignedIn;
});

export const walletSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, { payload }) => {
        state.isLoading = true;
        state.data = payload;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isSignedIn = true;
      state.isLoading = false;
      state.contractData = payload?.contractData;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
        state.isSignedIn = false;
        state.isLoading = false;
      });
    builder.addCase(signInCheck.fulfilled, (state, { payload }) => {
        state.isSignedIn = payload;
    })
  },
});

export const { signOut } = walletSlice.actions;

export default walletSlice.reducer;

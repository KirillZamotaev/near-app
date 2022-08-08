import { notification } from 'antd';
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

export const signIn = createAsyncThunk(
  'user/signIn',
  async (values: Record<string, string | number>) => {
    console.log('signIn async', values);
    const response = await WalletApi.requestSingIn(values);
    return response;
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  const response = await WalletApi.requestSingOut();
  return response;
});

export const signInCheck = createAsyncThunk('user/signinCheck', async () => {
  const isSignedIn = WalletApi.checkSignIn();

  return isSignedIn;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSignedIn = true;
      state.data = payload;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isSignedIn = true;
      state.isLoading = false;
      state.contractData = payload;
    });
    builder.addCase(signIn.rejected, (state, { error }) => {
      state.isSignedIn = false;
      state.isLoading = false;
      console.log('error', error)

      notification.open({
        message: 'Error',
        description: error.message,
      });
    });
    builder.addCase(signInCheck.fulfilled, (state, { payload }) => {
      state.isSignedIn = payload;
    });
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      notification.open({
        message: 'Signed out successfully',
      });
    });
    builder.addCase(signOut.pending, (state, { payload }) => {
      state.isSignedIn = false;
      state.data = {};
    });
    builder.addCase(signOut.rejected, (state, { payload }) => {
      state.isSignedIn = false;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

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
    // const response = await WalletApi.requestSignIn();
    return true;
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  const response = await WalletApi.requestSingOut();
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkSignIn: (state) => {
        state.isSignedIn = WalletApi.checkSignIn();
    }
  },
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

      notification['error']({
        message: 'Error',
        description: error.message,
      });
    });
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      notification['success']({
        message: 'Signed out successfully',
      });
    });
    builder.addCase(signOut.pending, (state, { payload }) => {
      state.isSignedIn = false;
      state.isLoading = true;
      state.data = {};
    });
    builder.addCase(signOut.rejected, (state, { payload }) => {
      state.isSignedIn = false;
      state.isLoading = false;
    });
  },
});

export const { checkSignIn } = userSlice.actions;

export default userSlice.reducer;

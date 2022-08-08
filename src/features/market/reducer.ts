import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WalletApi } from 'features/wallet/walletApi';
import { MarketItem } from 'intefaces';

export const getMarketData = createAsyncThunk('market/view', async (marketId: string) => {
    const response = await WalletApi.viewMarket(marketId);
    return response
})

export const getMarkets = createAsyncThunk('market/markets', async () => {
    const response = await WalletApi.getMarkets();
    return response
})

interface Order {
    price: number;
    quantity: number;
}


export interface MarketState {
    selectedMarket?: MarketItem | null;
    markets: {
        isLoading: boolean;
        isError: boolean;
        data: MarketItem[];
    },
    marketData: {
        isLoading: boolean;
        isError: boolean; 
        data: {
            ask_orders: Order[],
            bid_orders: Order[],
         };
    }
}

const initialState: MarketState = {
    selectedMarket: null,
    markets: {
        isLoading: false,
        isError: false,
        data: [],
    },
    marketData: {
        isLoading: false,
        isError: false, 
        data: {
            ask_orders: [],
            bid_orders: [],
         }
    }
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMarket: (state, { payload }) => {
        state.selectedMarket = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketData.pending, (state) => {
      state.marketData.isLoading = true;
    })
    builder.addCase(getMarketData.fulfilled, (state, { payload }) => {
      state.marketData.data = payload;
      state.marketData.isLoading = false
    })
    builder.addCase(getMarketData.rejected, (state) => {
      state.marketData.isLoading = false;
      state.marketData.isError = true;
    })
    builder.addCase(getMarkets.pending, (state) => {
      state.markets.isLoading = true;
    })
    builder.addCase(getMarkets.fulfilled, (state, { payload }) => {
      state.markets.data = payload;
      state.markets.isLoading = false
    })
    builder.addCase(getMarkets.rejected, (state) => {
      state.markets.isLoading = false;
      state.markets.isError = true;
    })
  },
})

export default walletSlice.reducer
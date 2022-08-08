import { createSelector } from "@reduxjs/toolkit"
import { selectSelf } from "store"

export const marketSelectedMarketSelector = createSelector(selectSelf, (state) => state.marketReducer.selectedMarket);
export const marketMarketDataSelector = createSelector(selectSelf, (state) => state.marketReducer.marketData);
export const marketsSelector = createSelector(selectSelf, (state) => state.marketReducer.markets);
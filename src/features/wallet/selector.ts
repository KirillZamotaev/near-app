import { createSelector } from "@reduxjs/toolkit"
import { selectSelf } from "store"

export const walletSelector = createSelector(selectSelf, (state) => state.walletReducer);
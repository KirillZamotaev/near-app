import { createSelector } from "@reduxjs/toolkit"
import { selectSelf } from "store"

export const userSelector = createSelector(selectSelf, (state) => state.userReducer)
import { configureStore } from '@reduxjs/toolkit'
import DarkModeSlice from '../features/DarkModeSlice.jsx'
import tokenSlice from '../features/tokenSlice.js'
import { appApi } from './api.js'
// ...

export const store = configureStore({
  reducer: {
    DarkModeSlice,
    tokenSlice,
    [appApi.reducerPath]: appApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(appApi.middleware),


})


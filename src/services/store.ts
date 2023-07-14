import { configureStore } from '@reduxjs/toolkit'
import { textApi } from './api'

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(textApi.middleware),
})

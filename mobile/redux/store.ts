import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import feedReducer from './feedSlice';
import { api, instagramApi } from './api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [instagramApi.reducerPath]: instagramApi.reducer,
    authentication: authenticationReducer,
    feed: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, instagramApi.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {}
export type AppDispatch = typeof store.dispatch;

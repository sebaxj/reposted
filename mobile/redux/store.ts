import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {}
export type AppDispatch = typeof store.dispatch;

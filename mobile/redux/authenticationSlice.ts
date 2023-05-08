import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

// Define a type for the slice state
export interface AuthenticationState {
  jwt?: JWT;
}

// Define the initial state using that type
const initialState: AuthenticationState = {
  jwt: undefined,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<string>) => {
      const jwt: JWT = jwt_decode(action.payload);
      // eslint-disable-next-line no-param-reassign
      state.jwt = { ...jwt };
    },
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.jwt = undefined;
    },
  },
});

// export actions for each case reducer function
export const { login, logout } = authenticationSlice.actions;

// export reducer
export default authenticationSlice.reducer;

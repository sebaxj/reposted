import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface AuthenticationState {
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthenticationState = {
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // signUp: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
});

// export actions for each case reducer function
export const { login, logout } = authenticationSlice.actions;

// export reducer
export default authenticationSlice.reducer;

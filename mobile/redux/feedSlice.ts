import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FeedState {
  global: boolean;
}

// Define the initial state using that type
const initialState: FeedState = {
  global: true,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    toggleFeedView: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.global = action.payload;
    },
  },
});

// export actions for each case reducer function
export const { toggleFeedView } = feedSlice.actions;

// export reducer
export default feedSlice.reducer;

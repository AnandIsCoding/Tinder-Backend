import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [], // Initialize as an empty array
  reducers: {
    // Replace the feed with a new array
    setFeed: (state, action) => {
      return action.payload; // Replace the entire feed
    },
    // Remove a specific feed item by its ID
    removeFromFeed: (state, action) => {
      return state.filter((feedItem) => feedItem._id !== action.payload);
    }
  },
});

export const { setFeed, removeFromFeed, addToFeed } = feedSlice.actions;
export default feedSlice.reducer;

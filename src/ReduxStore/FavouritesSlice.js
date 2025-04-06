import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    list: [],
  },
  reducers: {
    addToFavourites: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export default favouritesSlice.reducer;

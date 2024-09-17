import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResult: [], // Array of arrays
    movieName: [],   // Array of titles
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieResult, movieName } = action.payload;
      state.movieResult = Array.isArray(movieResult) ? movieResult : []; // Default to empty array if not an array
      state.movieName = Array.isArray(movieName) ? movieName : [];       // Default to empty array if not an array
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;

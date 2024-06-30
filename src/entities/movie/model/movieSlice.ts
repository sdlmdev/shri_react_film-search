import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../../shared/lib/types/types';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  genreFilter: string;
  yearFilter: string;
  searchQuery: string;
}

export const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  genreFilter: '',
  yearFilter: '',
  searchQuery: '',
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genreFilter = action.payload;
    },
    setYear(state, action: PayloadAction<string>) {
      state.yearFilter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setMovies, setLoading, setError, setGenre, setYear, setSearch } =
  movieSlice.actions;
export default movieSlice.reducer;

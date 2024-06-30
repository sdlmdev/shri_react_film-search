import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '@/entities/movie';
import { sessionApi } from '@/entities/session';
import { useDispatch } from 'react-redux';
import { movieSlice } from '@/entities/movie/model/movieSlice';
import { sessionSlice } from '@/entities/session/model/sessionSlice';
import { restoreLogin } from '@/entities/session/model/sessionSlice';

export const appStore = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    movies: movieSlice.reducer,
    session: sessionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApi.middleware, sessionApi.middleware,
    ),
});

const token = localStorage.getItem('token');

if (token && token !== 'Ошибка') {
  appStore.dispatch(restoreLogin(token));
}

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

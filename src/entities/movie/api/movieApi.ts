import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shared/lib/constants/constants';
import { Movie } from '../../../shared/lib/types/types';
import { Actor } from '../../../shared/lib/types/types';
import { RootState } from '@/app/store';

export interface Movies extends Movie {
  actors: Actor[];
}

export interface GetMovieByIdArg {
  id: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).session.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Movies'],
  endpoints: ({ query, mutation }) => ({
    getMovieById: query({
      query: (id) => `/movie/${id}`,
    }),
    getFilms: query({
      query: ({ title = '', genre = '', release_year = '', page = 1 }) => {
        const params = new URLSearchParams();
        const queryParameters = { title, genre, release_year, page: page.toString() };

        Object.entries(queryParameters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        return { url: `/search?${params.toString()}` };
      },
    }),
    rateMovie: mutation({
      query: (rating) => ({
        url: '/rateMovie',
        method: 'POST',
        body: rating,
      }),
    }),
  }),
});

export const { useGetMovieByIdQuery, useGetFilmsQuery, useRateMovieMutation } = movieApi;

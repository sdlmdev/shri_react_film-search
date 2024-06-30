import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../shared/lib/constants/constants';
import { Credentials } from '../../../shared/lib/types/types';

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Session'],
  endpoints: ({ mutation }) => ({
    login: mutation<Credentials, Credentials>({
      query: (credentials: Credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = sessionApi;

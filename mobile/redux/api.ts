import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from './authenticationSlice';

export interface LoginRequest {
  idToken: string;
  firstName?: string | null;
  lastName?: string | null;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6868',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/user/authenticate',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          if (!meta?.response) throw new Error('No JWT found');
          const jwt: string | null = meta?.response.headers.get('set-cookie');
          dispatch(setCredentials(jwt as string));
        } catch (err: unknown) {
          // TODO: Handle error
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = api;

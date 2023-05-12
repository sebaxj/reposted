import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from './authenticationSlice';

export interface LoginRequest {
  idToken: string;
  firstName?: string | null;
  lastName?: string | null;
}

// Reposted API
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

// Instagram API
export const instagramApi = createApi({
  reducerPath: 'instagramApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.instagram.com',
  }),
  endpoints: (builder) => ({
    getUserAccessToken: builder.mutation<object, string>({
      query: (code) => ({
        url: '/oauth/access_token',
        method: 'POST',
        body: { client_id: '', client_secret: '', grant_type: '', redirect_uri: '', code },
      }),
      async onQueryStarted(code, { dispatch, queryFulfilled }) {
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

// Instagram Graph API
export const instagramGraphApi = createApi({
  reducerPath: 'instagramGraphApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graph.instagram.com',
  }),
  endpoints: (builder) => ({
    getLongUserAccessToken: builder.mutation<object, string>({
      query: (accessToken) => ({
        url: `/access_token?grant_type=ig_exchange_token&client_secret=c49ed426bcd9c7d2465d14b5e223792d&access_token=${accessToken}`,
        method: 'GET',
      }),
      async onQueryStarted(accessToken, { dispatch, queryFulfilled }) {
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
export const { useGetUserAccessTokenMutation } = instagramApi;
export const { useGetLongUserAccessTokenMutation } = instagramGraphApi;

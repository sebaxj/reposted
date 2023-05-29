import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from './authenticationSlice';
import type { RootState } from './store';

export interface LoginRequest {
  idToken: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface CreatePostRequest {
  url: string;
  source: 'twitter' | 'instagram' | 'tiktok';
  privacy: 'public' | 'private';
}

// Reposted API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6868',
    prepareHeaders: (
      headers: Headers,
      { getState, endpoint }: { getState: () => unknown; endpoint: string },
    ) => {
      if (endpoint === 'login') return headers;
      const { jwtToken } = (getState() as RootState).authentication;
      if (jwtToken) {
        headers.set('Cookie', jwtToken);
      }
      return headers;
    },
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
          dispatch(logout());
          throw new Error('Error logging in');
        }
      },
    }),
    createPost: builder.mutation<ApiResponse, CreatePostRequest>({
      query: (postBody) => ({
        url: '/post/create',
        method: 'POST',
        body: { ...postBody },
      }),
    }),
    getUser: builder.query<ApiResponse, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

// Instagram API
export const instagramApi = createApi({
  reducerPath: 'instagramApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.instagram.com/api/v1/oembed',
  }),
  endpoints: (builder) => ({
    getInstagramPostEmbedCode: builder.query<{ html: string }, string>({
      query: (link) => ({
        url: `?url=${encodeURIComponent(link)}&hidecaption=0`,
        method: 'GET',
      }),
    }),
  }),
});

// TikTok API
export const tiktokApi = createApi({
  reducerPath: 'tiktokApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.tiktok.com/oembed',
  }),
  endpoints: (builder) => ({
    getTiktokPostEmbedCode: builder.query<{ html: string }, string>({
      query: (link) => ({
        url: `?url=${encodeURIComponent(link)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useCreatePostMutation, useGetUserQuery } = api;
export const { useGetInstagramPostEmbedCodeQuery } = instagramApi;
export const { useGetTiktokPostEmbedCodeQuery } = tiktokApi;

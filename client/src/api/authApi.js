

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api `|| 'http://localhost:5000/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      // Get Clerk token
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    
    // ============================================
    // PUBLIC ENDPOINTS
    // ============================================
    
    // Sync user from frontend  // without webhook
    syncUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/sync',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // ============================================
    // PROTECTED ENDPOINTS
    // ============================================
    
    // Get current user profile
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),

    // Delete account
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/auth/account',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSyncUserMutation,

  useGetMeQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = authApi;
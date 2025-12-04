

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = `${import.meta.env.VITE_API_URL}/api `|| 'http://localhost:5000/api';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: async (headers) => {
//       // Get Clerk token
//       const token = await window.Clerk?.session?.getToken();
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['User'],
//   endpoints: (builder) => ({
    
//     // ============================================
//     // PUBLIC ENDPOINTS
//     // ============================================
    
//     // Sync user from frontend  // without webhook
//     syncUser: builder.mutation({
//       query: (userData) => ({
//         url: '/auth/sync',
//         method: 'POST',
//         body: userData,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     // ============================================
//     // PROTECTED ENDPOINTS
//     // ============================================
    
//     // Get current user profile
//     getMe: builder.query({
//       query: () => '/auth/me',
//       providesTags: ['User'],
//     }),

//     // Update user profile
//     updateProfile: builder.mutation({
//       query: (profileData) => ({
//         url: '/auth/profile',
//         method: 'PUT',
//         body: profileData,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     // Delete account
//     deleteAccount: builder.mutation({
//       query: () => ({
//         url: '/auth/account',
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useSyncUserMutation,

//   useGetMeQuery,
//   useUpdateProfileMutation,
//   useDeleteAccountMutation,
// } = authApi;











// redux/api/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    // prepareHeaders: async (headers) => {
    //   try {
    //     // Get fresh Clerk token
    //     if (window.Clerk?.session) {
    //       const token = await window.Clerk.session.getToken();
    //       if (token) {
    //         headers.set('Authorization', `Bearer ${token}`);
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error getting Clerk token:', error);
    //   }
      
    //   headers.set('Content-Type', 'application/json');
    //   return headers;
    // },
    // Add credentials for cookie-based auth if needed
    
  //   prepareHeaders: async (headers) => {
  //   try {
  //     if (window.Clerk?.session) {
  //       const token = await window.Clerk.session.getToken();
  //       if (token) {
  //         headers.set('Authorization', `Bearer ${token}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error getting Clerk token:', error);
  //   }
    
  //   headers.set('Content-Type', 'application/json');
  //   return headers;
  // },


  prepareHeaders: async (headers, { getState }) => {
  const clerk = window.Clerk;

  if (clerk?.session) {
    try {
      const token = await clerk.session.getToken({ template: "default" });
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch (err) {
      console.log("Token fetch failed:", err);
    }
  }

  return headers;
},
    credentials: 'include',
  }),
  tagTypes: ['User', 'Stats'],
  endpoints: (builder) => ({
    
    // ============================================
    // PUBLIC ENDPOINTS
    // ============================================
    
    // Sync user from frontend (manual sync - PRIMARY METHOD)
    syncUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/sync',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User', 'Stats'],
      // Handle response
      transformResponse: (response) => {
        console.log('✅ Sync response:', response);
        return response;
      },
      // Handle errors
      transformErrorResponse: (error) => {
        console.error('❌ Sync error:', error);
        return error;
      },
    }),

    // ============================================
    // PROTECTED ENDPOINTS
    // ============================================
    
    // Get current user profile
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
      transformResponse: (response) => response.user,
      // Retry failed requests
      retry: 1,
    }),

    // Get user statistics
    getStats: builder.query({
      query: () => '/auth/stats',
      providesTags: ['Stats'],
      transformResponse: (response) => response.stats,
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

    // Reset learning journey
    resetJourney: builder.mutation({
      query: () => ({
        url: '/auth/reset-journey',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Stats'],
    }),

    // Delete account
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/auth/account',
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Stats'],
    }),
  }),
});

export const {
  useSyncUserMutation,
  useGetMeQuery,
  useGetStatsQuery,
  useUpdateProfileMutation,
  useResetJourneyMutation,
  useDeleteAccountMutation,
} = authApi;
import { BASE_URL } from "@/constants";
import { ICurrentUser, WatchLaterSchemaTypes } from "@/types/user.types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

// const BASE_URL: string = "http://localhost:4000";
// // const BASE_URL: string = "";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["current-user", "verify-token", "watch-later"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        credentials: "include",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (_, error) =>
        error ? [] : ["current-user", "verify-token", "watch-later"],
    }),
    verifyToken: builder.query<unknown, void>({
      query: () => ({
        url: "/api/auth/verify-token",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["verify-token"],
    }),
    currentUser: builder.query<ICurrentUser, void>({
      query: () => ({
        url: "/api/auth/current-user",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["current-user"],
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: "/api/auth/logout",
        credentials: "include",
        method: "POST",
      }),
      invalidatesTags: (_, error) =>
        error ? [] : ["current-user", "verify-token"],
    }),
    addWatchLater: builder.mutation({
      query: (body: WatchLaterSchemaTypes) => ({
        url: "/api/watch-later",
        method: "POST",
        credentials: "include",
        body: body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["watch-later"]),
    }),
    getWatchLater: builder.query<WatchLaterSchemaTypes[], void>({
      query: () => ({
        url: "/api/get-watch-later",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["watch-later"],
    }),
    removeWatchLater: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: "/api/delete-watch-later",
        method: "DELETE",
        body: { id },
        credentials: "include",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["watch-later"]),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyTokenQuery,
  useCurrentUserQuery,
  useLogoutMutation,
  useAddWatchLaterMutation,
  useGetWatchLaterQuery,
  useRemoveWatchLaterMutation,
} = auth;

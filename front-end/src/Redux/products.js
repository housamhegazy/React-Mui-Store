// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-mui-store.onrender.com/' }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
})
export const oneproductsApi = createApi({
  reducerPath: 'oneproductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-mui-store.onrender.com/' }),
  endpoints: (builder) => ({
    getoneproductsByName: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})

export const { useGetproductsByNameQuery } = productsApi
export const { useGetoneproductsByNameQuery } = oneproductsApi
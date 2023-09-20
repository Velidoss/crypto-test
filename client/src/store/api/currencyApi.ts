import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCurrencyId } from '../modal/slice';

export type CurrencyValue = { amount: string; time: string }[];

export type Currency = {
  _id: string;
  name: string;
  imageUrl: string;
  values: CurrencyValue[];
};

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
  }),
  tagTypes: ['Currencies'],
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], void>({
      query: () => ({ url: `/get-currencies`, method: 'get' }),
      providesTags: ['Currencies'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;

        dispatch(setCurrencyId(result.data[1]._id));
      },
    }),
    addCurrency: builder.mutation<Currency, FormData>({
      query: (formData) => ({ url: `/add-currency`, method: 'post', body: formData }),
      invalidatesTags: ['Currencies'],
    }),
    addCurrencyValue: builder.mutation<
      Currency,
      { id: string; amount: number; time: string }
    >({
      query: ({ id, amount, time }) => ({
        url: `/add-currency-value/${id}`,
        method: 'put',
        body: {
          amount: amount.toString(),
          time,
        },
      }),
      invalidatesTags: ['Currencies'],
    }),
    editCurrencyValue: builder.mutation<
      Currency,
      { id: string; valueId: string; amount: number }
    >({
      query: ({ id, valueId, amount }) => ({
        url: `/edit-currency-value/${id}/${valueId}`,
        method: 'patch',
        body: {
          amount: amount.toString(),
        },
      }),
      invalidatesTags: ['Currencies'],
    }),
    deleteCurrencyValue: builder.mutation<Currency, { id: string; valueId: string }>({
      query: ({ id, valueId }) => ({
        url: `/delete-currency-value/${id}/${valueId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Currencies'],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useAddCurrencyMutation,
  useAddCurrencyValueMutation,
  useEditCurrencyValueMutation,
  useDeleteCurrencyValueMutation,
} = currencyApi;

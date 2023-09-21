import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setInitalCurrencyId } from '../modal/slice';

export type CurrencyValue = { _id: string; amount: string; time: string };

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

        dispatch(setInitalCurrencyId(result.data[1]._id));
      },
    }),
    getCurrencyUSDTValue: builder.query<{ USDT: number }, string>({
      query: (currencyName) => ({
        url: `https://min-api.cryptocompare.com/data/price?fsym=${currencyName}&tsyms=USDT`,
      }),
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
      { id: string; valueId: string; amount: number; time: string }
    >({
      query: ({ id, valueId, amount, time }) => ({
        url: `/edit-currency-value/${id}/${valueId}`,
        method: 'put',
        body: {
          amount: amount.toString(),
          time,
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
  useGetCurrencyUSDTValueQuery,
  useAddCurrencyMutation,
  useAddCurrencyValueMutation,
  useEditCurrencyValueMutation,
  useDeleteCurrencyValueMutation,
} = currencyApi;

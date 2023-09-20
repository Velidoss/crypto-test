import { configureStore } from '@reduxjs/toolkit';

import { currencyApi } from './api/currencyApi';
import { modalSliceReducer } from './modal/slice';

export const store = configureStore({
  reducer: {
    modal: modalSliceReducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
  devTools: import.meta.env.MODE !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

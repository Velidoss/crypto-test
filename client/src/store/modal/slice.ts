import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currency } from '../api/currencyApi';
import { RootState } from '../store';

type initialState = {
  open: boolean;
  modalType: 'currency' | 'value' | null;
  selectedCurrencyId: string | null;
};

const initialState: initialState = {
  open: false,
  modalType: null,
  selectedCurrencyId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModalOpen: (state, { payload }) => {
      state.open = true;
      state.modalType = payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.modalType = null;
    },
    setCurrencyId: (state, { payload }) => {
      state.selectedCurrencyId = payload;
    },
  },
});

export const isMOdalOpenSeelctor = (state: RootState) => state.modal.open;
export const modalTypeSelector = (state: RootState) => state.modal.modalType;
export const currencyIdSelector = (state: RootState) => state.modal.selectedCurrencyId;

export const { toggleModalOpen, closeModal, setCurrencyId } = modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;

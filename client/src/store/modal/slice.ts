import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  open: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModalOpen: (state) => {
      state.open = !state.open;
    }
  }
});

export const isMOdalOpenSeelctor = (state: RootState) => state.modal.open;

export const {toggleModalOpen} = modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;
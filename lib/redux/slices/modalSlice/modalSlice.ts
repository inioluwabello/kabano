import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalSliceState } from '@/lib/interfaces';


const initialState: ModalSliceState = {
  isOpen: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

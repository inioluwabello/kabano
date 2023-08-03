// pageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageSliceState {
  theme: string;
  isLeftPaneVisible: boolean;
}

const initialState: PageSliceState = {
  theme: 'light',
  isLeftPaneVisible: true
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setLeftPaneVisibility: (state, action: PayloadAction<boolean>) => {
      state.isLeftPaneVisible = action.payload
    }
  },
});

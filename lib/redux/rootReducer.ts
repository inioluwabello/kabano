/* Instruments */
import { pageSlice, boardSlice, modalSlice } from './slices'

export const reducer = {
  page: pageSlice.reducer,
  board: boardSlice.reducer,
  modal: modalSlice.reducer
}

/* Instruments */
import { boardSlice, pageSlice } from './slices'

export const reducer = {
  page: pageSlice.reducer,
  board: boardSlice.reducer  
}

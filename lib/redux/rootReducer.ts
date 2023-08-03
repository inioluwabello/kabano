/* Instruments */
import { counterSlice } from './slices'
import { pageSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  page: pageSlice.reducer
}

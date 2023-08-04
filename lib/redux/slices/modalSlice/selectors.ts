/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectModalState = (state: ReduxState) => state.modal.isOpen
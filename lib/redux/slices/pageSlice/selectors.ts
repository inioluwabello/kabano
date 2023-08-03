/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectTheme = (state: ReduxState) => state.page.theme
export const selectLeftPaneVisibility =(state: ReduxState) => state.page.isLeftPaneVisible
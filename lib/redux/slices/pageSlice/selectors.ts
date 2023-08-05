/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectTheme = (state: ReduxState) => state.page.theme
export const selectLeftPaneVisibility = (state: ReduxState) => state.page.isLeftPaneVisible
export const selectPageStatus = (state: ReduxState) => state.page.status
export const selectLoginError = (state: ReduxState) => state.page.loginError
export const selectSignUpError = (state: ReduxState) => state.page.signUpError


/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectBoards = (state: ReduxState) => state.board.boards
export const selectTasks = (state: ReduxState) => state.board.tasks
export const getSelectedBoard = (state: ReduxState) => state.board.selectedBoard

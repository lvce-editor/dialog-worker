import type { DialogState } from '../DialogState/DialogState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderFocus

export const isEqual = (oldState: DialogState, newState: DialogState): boolean => {
  return oldState.focusId === newState.focusId
}

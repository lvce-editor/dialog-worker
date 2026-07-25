import type { DialogState } from '../DialogState/DialogState.ts'
import * as DialogFocusId from '../DialogFocusId/DialogFocusId.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderFocusContext

export const isEqual = (oldState: DialogState, newState: DialogState): boolean => {
  return Boolean(oldState.focusId) === Boolean(newState.focusId) || newState.focusId === DialogFocusId.None
}

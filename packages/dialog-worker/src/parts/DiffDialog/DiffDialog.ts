import type { DialogState } from '../DialogState/DialogState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderDialog

export const isEqual = (oldState: DialogState, newState: DialogState): boolean => {
  return (
    oldState.closeMessage === newState.closeMessage &&
    oldState.confirmMessage === newState.confirmMessage &&
    oldState.message === newState.message &&
    oldState.title === newState.title &&
    oldState.type === newState.type
  )
}

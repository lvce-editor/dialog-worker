import type { DialogState } from '../DialogState/DialogState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderDialog

export const isEqual = (oldState: DialogState, newState: DialogState): boolean => {
  return (
    oldState.closeMessage === newState.closeMessage &&
    oldState.confirmMessage === newState.confirmMessage &&
    oldState.kind === newState.kind &&
    oldState.message === newState.message &&
    oldState.password === newState.password &&
    oldState.requestId === newState.requestId &&
    oldState.title === newState.title &&
    oldState.type === newState.type &&
    oldState.username === newState.username
  )
}

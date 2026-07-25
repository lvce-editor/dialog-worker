import type { DialogState } from '../DialogState/DialogState.ts'
import * as DialogStates from '../DialogStates/DialogStates.ts'

export const create = (uid: number): void => {
  const state: DialogState = {
    closeMessage: '',
    confirmMessage: '',
    focusId: 0,
    message: '',
    title: '',
    type: 'info',
    uid,
  }
  DialogStates.set(uid, state, state)
}

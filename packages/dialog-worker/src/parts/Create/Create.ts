import type { DialogState } from '../DialogState/DialogState.ts'
import * as DialogStates from '../DialogStates/DialogStates.ts'

export const create = (uid: number): void => {
  const state: DialogState = {
    closeMessage: '',
    confirmMessage: '',
    focusId: 0,
    kind: 'message',
    message: '',
    password: '',
    requestId: '',
    title: '',
    type: 'info',
    uid,
    username: '',
  }
  DialogStates.set(uid, state, state)
}

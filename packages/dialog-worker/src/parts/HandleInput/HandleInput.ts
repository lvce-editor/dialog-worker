import type { DialogState } from '../DialogState/DialogState.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleInput = (state: DialogState, name: string, value: string): DialogState => {
  if (name === InputName.Username) {
    return {
      ...state,
      username: value,
    }
  }
  if (name === InputName.Password) {
    return {
      ...state,
      password: value,
    }
  }
  return state
}

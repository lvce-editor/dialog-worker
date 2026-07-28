import type { DialogState } from '../DialogState/DialogState.ts'
import * as HandleSubmit from '../HandleSubmit/HandleSubmit.ts'

export const handleClickButton = async (state: DialogState): Promise<DialogState> => {
  return HandleSubmit.handleSubmit(state)
}

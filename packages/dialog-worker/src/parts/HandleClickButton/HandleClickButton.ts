import type { DialogState } from '../DialogState/DialogState.ts'
import * as Close from '../Close/Close.ts'

export const handleClickButton = async (state: DialogState): Promise<DialogState> => {
  await Close.close()
  return state
}

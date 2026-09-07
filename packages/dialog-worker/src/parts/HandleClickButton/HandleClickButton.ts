import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as Close from '../Close/Close.ts'
import * as HandleSubmit from '../HandleSubmit/HandleSubmit.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleClickButton = async (state: DialogState, name?: string): Promise<DialogState> => {
  if (name === InputName.Action && state.actionCommand && state.actionLabel) {
    await Close.close()
    await RendererWorker.invoke('ExtensionHost.executeCommand', state.actionCommand)
    return state
  }
  return HandleSubmit.handleSubmit(state)
}

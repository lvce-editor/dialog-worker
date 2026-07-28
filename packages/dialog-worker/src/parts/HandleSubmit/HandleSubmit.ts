import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as Close from '../Close/Close.ts'
import * as DialogKind from '../DialogKind/DialogKind.ts'

export const handleSubmit = async (state: DialogState): Promise<DialogState> => {
  if (state.kind !== DialogKind.BasicAuth) {
    await Close.close()
    return state
  }
  const { password, requestId, username } = state
  await Close.close()
  await RendererWorker.invoke('ElectronBrowserView.acceptLogin', requestId, username, password)
  return state
}

import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as Close from '../Close/Close.ts'
import * as DialogKind from '../DialogKind/DialogKind.ts'

export const handleClickClose = async (state: DialogState): Promise<DialogState> => {
  const { kind, requestId } = state
  await Close.close()
  if (kind === DialogKind.BasicAuth) {
    await RendererWorker.invoke('ElectronBrowserView.cancelLogin', requestId)
  }
  return state
}

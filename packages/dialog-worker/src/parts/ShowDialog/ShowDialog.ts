import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogOptions } from '../DialogOptions/DialogOptions.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const showDialog = async (options: DialogOptions): Promise<void> => {
  await RendererWorker.invoke('Viewlet.openWidget', ViewletModuleId.Dialog, options)
}

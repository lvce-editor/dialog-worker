import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const close = async (): Promise<void> => {
  await RendererWorker.closeWidget(ViewletModuleId.Dialog)
}

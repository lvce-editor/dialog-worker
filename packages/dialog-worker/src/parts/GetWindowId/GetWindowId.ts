import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWindowId = async (): Promise<number> => {
  return RendererWorker.getWindowId()
}

import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererProcess, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToRendererProcess(port)
}

export const initializeRendererProcess = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  RendererProcess.set(rpc)
}

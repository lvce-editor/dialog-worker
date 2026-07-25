import { RpcId } from '@lvce-editor/constants'
import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { FilePermissionProcess, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToFilePermissionProcess(port, RpcId.DialogWorker)
}

export const initializeFilePermissionProcess = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  FilePermissionProcess.set(rpc)
}

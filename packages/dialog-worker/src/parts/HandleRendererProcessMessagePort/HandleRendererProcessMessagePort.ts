import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DialogStates from '../DialogStates/DialogStates.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const handleRendererProcessMessagePort = async (port: MessagePort): Promise<void> => {
  const rpc = await PlainMessagePortRpc.create({
    commandMap: DialogStates.createDirectEventCommandMap((uid) => RendererWorker.invoke('Viewlet.requestRender', uid)),
    messagePort: port,
  })
  RendererProcess.set(rpc)
}

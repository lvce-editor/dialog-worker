import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as DialogStates from '../DialogStates/DialogStates.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly unknown[] | Promise<readonly unknown[]> => {
  const { oldState, scheduledState } = DialogStates.get(uid)
  DialogStates.set(uid, scheduledState, scheduledState)
  const commands = ApplyRender.applyRender(oldState, scheduledState, diffResult)
  if (!RendererProcess.isConnected()) return commands
  return renderDirect(uid, commands)
}

const renderDirect = async (uid: number, commands: readonly unknown[]): Promise<readonly unknown[]> => {
  const rendererWorkerCommands = commands.filter((command: any) => command[0] === 'Viewlet.setFocusContext')
  const rendererProcessCommands = commands.filter((command: any) => command[0] !== 'Viewlet.setFocusContext')
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}

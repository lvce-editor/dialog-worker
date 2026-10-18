import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as States from '../DialogStates/DialogStates.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import { queueRender } from '../QueueRender/QueueRender.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] | Promise<readonly any[]> => {
  const pendingDiffs = [...new Set([...diffResult, ...Diff2.diff2(uid)])]
  const { oldState, scheduledState } = States.get(uid)
  const commands = ApplyRender.applyRender(oldState, scheduledState, pendingDiffs)
  const adjusted = RendererProcess.isConnected()
    ? commands.map((command: readonly any[]) => {
        if (command[0] === 'Viewlet.setDom2' || command[0] === 'Viewlet.focusSelector') {
          return [command[0], uid, ...command.slice(1)]
        }
        return command
      })
    : commands
  return queueRender(uid, adjusted, oldState, scheduledState)
}

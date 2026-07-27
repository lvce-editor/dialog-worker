import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const handleFocusIn = async (context: AsyncCommandContext<DialogState>): Promise<void> => {
  await RendererWorker.setFocus(WhenExpression.FocusDialog)
  await context.updateState((state) => state)
}

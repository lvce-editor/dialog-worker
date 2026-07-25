import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import type { DialogOptions } from '../DialogOptions/DialogOptions.ts'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as DialogFocusId from '../DialogFocusId/DialogFocusId.ts'
import * as DialogStrings from '../DialogStrings/DialogStrings.ts'

export const loadContent2 = async (context: AsyncCommandContext<DialogState>, options: DialogOptions): Promise<void> => {
  await context.updateState((state) => ({
    ...state,
    closeMessage: options.closeMessage ?? DialogStrings.cancel(),
    confirmMessage: options.confirmMessage ?? DialogStrings.ok(),
    focusId: DialogFocusId.Confirm,
    message: options.message,
    title: options.title,
    type: options.type ?? 'info',
  }))
}

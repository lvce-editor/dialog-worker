import type { DialogState } from '../DialogState/DialogState.ts'
import * as GetDialogVirtualDom from '../GetDialogVirtualDom/GetDialogVirtualDom.ts'

export const renderDialog = (oldState: DialogState, newState: DialogState): readonly unknown[] => {
  return ['Viewlet.setDom2', GetDialogVirtualDom.getDialogVirtualDom(newState)]
}

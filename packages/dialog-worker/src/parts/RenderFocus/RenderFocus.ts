import type { DialogState } from '../DialogState/DialogState.ts'
import * as GetFocusSelector from '../GetFocusSelector/GetFocusSelector.ts'

export const renderFocus = (oldState: DialogState, newState: DialogState): readonly unknown[] => {
  const name = GetFocusSelector.getFocusSelector(newState.focusId)
  return ['Viewlet.focusSelector', `[name="${name}"]`]
}

import type { DialogState } from '../DialogState/DialogState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: DialogState, newState: DialogState): readonly unknown[] => {
  return ['Viewlet.setFocusContext', WhenExpression.FocusDialog]
}

import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleClickButton,
      params: ['handleClickButton', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleClickClose,
      params: ['handleClickClose'],
    },
    {
      name: DomEventListenerFunctions.HandleFocusIn,
      params: ['handleFocusIn'],
    },
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: [],
      preventDefault: true,
    },
  ]
}

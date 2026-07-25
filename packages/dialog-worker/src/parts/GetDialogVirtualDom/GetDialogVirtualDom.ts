import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as AriaBoolean from '../AriaBoolean/AriaBoolean.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetDialogIconVirtualDom from '../GetDialogIconVirtualDom/GetDialogIconVirtualDom.ts'
import * as Ids from '../Ids/Ids.ts'
import * as InputName from '../InputName/InputName.ts'
import * as JoinBySpace from '../JoinBySpace/JoinBySpace.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getDialogVirtualDom = (state: DialogState): readonly VirtualDomNode[] => {
  const { closeMessage, confirmMessage, message, title, type } = state
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.DialogOverlay),
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabelledBy: JoinBySpace.joinBySpace(Ids.DialogIcon, Ids.DialogHeading),
      ariaModal: AriaBoolean.True,
      childCount: 3,
      className: ClassNames.DialogContent,
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      role: AriaRoles.Dialog,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DialogToolBarRow,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: closeMessage,
      childCount: 1,
      className: ClassNames.DialogClose,
      onClick: DomEventListenerFunctions.HandleClickClose,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconClose),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DialogMessageRow,
      type: VirtualDomElements.Div,
    },
    GetDialogIconVirtualDom.getDialogIconVirtualDom(type),
    {
      childCount: 2,
      className: ClassNames.DialogContentRight,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DialogHeading,
      id: Ids.DialogHeading,
      type: VirtualDomElements.Div,
    },
    text(title),
    {
      childCount: 1,
      className: ClassNames.DialogMessage,
      type: VirtualDomElements.Div,
    },
    text(message),
    {
      childCount: 1,
      className: ClassNames.DialogButtonsRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      name: InputName.Confirm,
      onClick: DomEventListenerFunctions.HandleClickButton,
      type: VirtualDomElements.Button,
    },
    text(confirmMessage),
  ]
}

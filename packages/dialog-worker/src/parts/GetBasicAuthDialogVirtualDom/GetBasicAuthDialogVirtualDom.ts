import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DialogState } from '../DialogState/DialogState.ts'
import * as AriaBoolean from '../AriaBoolean/AriaBoolean.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as Ids from '../Ids/Ids.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getField = (label: string, name: string, value: string, inputType: string, autocomplete: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ClassNames.BasicAuthDialogField,
      type: VirtualDomElements.Label,
    },
    {
      childCount: 0,
      text: label,
      type: VirtualDomElements.Text,
    },
    {
      autocomplete,
      childCount: 0,
      className: ClassNames.InputBox,
      inputType,
      name,
      onInput: DomEventListenerFunctions.HandleInput,
      type: VirtualDomElements.Input,
      value,
    },
  ]
}

export const getBasicAuthDialogVirtualDom = (state: DialogState): readonly VirtualDomNode[] => {
  const { closeMessage, confirmMessage, message, password, title, username } = state
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.DialogOverlay),
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabelledBy: Ids.DialogHeading,
      ariaModal: AriaBoolean.True,
      childCount: 2,
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
      childCount: 5,
      className: ClassNames.BasicAuthDialogForm,
      onSubmit: DomEventListenerFunctions.HandleSubmit,
      type: VirtualDomElements.Form,
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
      className: ClassNames.BasicAuthDialogDescription,
      type: VirtualDomElements.Div,
    },
    text(message),
    ...getField('Username', InputName.Username, username, 'text', 'username'),
    ...getField('Password', InputName.Password, password, 'password', 'current-password'),
    {
      childCount: 1,
      className: ClassNames.DialogButtonsRow,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      inputType: 'submit',
      name: InputName.Confirm,
      type: VirtualDomElements.Button,
    },
    text(confirmMessage),
  ]
}

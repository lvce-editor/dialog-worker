import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DialogType } from '../DialogType/DialogType.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DialogStrings from '../DialogStrings/DialogStrings.ts'
import * as Ids from '../Ids/Ids.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const getIcon = (type: DialogType): readonly [string, string, string] => {
  switch (type) {
    case 'error':
      return [ClassNames.DialogErrorIcon, ClassNames.MaskIconError, DialogStrings.error()]
    case 'info':
      return [ClassNames.DialogInfoIcon, ClassNames.MaskIconInfo, DialogStrings.info()]
    case 'warning':
      return [ClassNames.DialogWarningIcon, ClassNames.MaskIconWarning, DialogStrings.warning()]
  }
}

export const getDialogIconVirtualDom = (type: DialogType): VirtualDomNode => {
  const [iconClassName, maskClassName, label] = getIcon(type)
  return {
    ariaLabel: label,
    childCount: 0,
    className: MergeClassNames.mergeClassNames(ClassNames.DialogIcon, iconClassName, ClassNames.MaskIcon, maskClassName),
    id: Ids.DialogIcon,
    type: VirtualDomElements.Div,
  }
}

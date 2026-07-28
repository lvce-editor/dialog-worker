import type { DialogKind } from '../DialogKind/DialogKind.ts'
import type { DialogType } from '../DialogType/DialogType.ts'

export interface DialogState {
  readonly closeMessage: string
  readonly confirmMessage: string
  readonly focusId: number
  readonly kind: DialogKind
  readonly message: string
  readonly password: string
  readonly requestId: string
  readonly title: string
  readonly type: DialogType
  readonly uid: number
  readonly username: string
}

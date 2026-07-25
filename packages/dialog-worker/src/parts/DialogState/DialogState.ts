import type { DialogType } from '../DialogType/DialogType.ts'

export interface DialogState {
  readonly closeMessage: string
  readonly confirmMessage: string
  readonly focusId: number
  readonly message: string
  readonly title: string
  readonly type: DialogType
  readonly uid: number
}

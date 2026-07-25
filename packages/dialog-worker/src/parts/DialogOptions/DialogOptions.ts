import type { DialogType } from '../DialogType/DialogType.ts'

export interface DialogOptions {
  readonly closeMessage?: string
  readonly confirmMessage?: string
  readonly message: string
  readonly title: string
  readonly type?: DialogType
}

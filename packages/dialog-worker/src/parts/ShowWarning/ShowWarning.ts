import type { DialogOptions } from '../DialogOptions/DialogOptions.ts'
import * as ShowDialog from '../ShowDialog/ShowDialog.ts'

export const showWarning = async (options: Omit<DialogOptions, 'type'>): Promise<void> => {
  await ShowDialog.showDialog({
    ...options,
    type: 'warning',
  })
}

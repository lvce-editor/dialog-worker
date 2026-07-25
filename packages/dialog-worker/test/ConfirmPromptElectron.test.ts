import { expect, test } from '@jest/globals'
import { RendererWorker, SharedProcess } from '@lvce-editor/rpc-registry'
import * as ConfirmPromptElectron from '../src/parts/ConfirmPromptElectron/ConfirmPromptElectron.ts'

const registerMessageBoxResult = (result: number): void => {
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'(): number {
      return 1
    },
  })
  SharedProcess.registerMockRpc({
    'ElectronDialog.showMessageBox'(): number {
      return result
    },
  })
}

test('prompt - returns true for the confirm button', async () => {
  registerMessageBoxResult(1)
  await expect(ConfirmPromptElectron.prompt('Continue?', 'Yes', 'Question', 'No')).resolves.toBe(true)
})

test('prompt - returns false for the cancel button', async () => {
  registerMessageBoxResult(0)
  await expect(ConfirmPromptElectron.prompt('Continue?', 'Yes', 'Question', 'No')).resolves.toBe(false)
})

test('promptError - returns true for the confirm button', async () => {
  registerMessageBoxResult(0)
  await expect(ConfirmPromptElectron.promptError('Oops', 'Close', 'Error')).resolves.toBe(true)
})

test('promptError - returns false for an unexpected button', async () => {
  registerMessageBoxResult(1)
  await expect(ConfirmPromptElectron.promptError('Oops', 'Close', 'Error')).resolves.toBe(false)
})

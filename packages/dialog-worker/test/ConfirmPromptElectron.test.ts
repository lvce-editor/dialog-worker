import { expect, test } from '@jest/globals'
import { MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ConfirmPromptElectron from '../src/parts/ConfirmPromptElectron/ConfirmPromptElectron.ts'

const registerMessageBoxResult = (result: number | undefined): void => {
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'(): number {
      return 1
    },
  })
  MainProcess.registerMockRpc({
    'ElectronDialog.showMessageBox'(): number | undefined {
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

test.each([
  [0, 'save'],
  [1, 'cancel'],
  [2, 'discard'],
  [undefined, 'cancel'],
])('prompt3 - maps response %s to %s', async (result, expected) => {
  registerMessageBoxResult(result)
  await expect(ConfirmPromptElectron.prompt3('Save?', 'Save', 'Question', 'Cancel', "Don't Save")).resolves.toBe(expected)
})

test('promptError - returns true for the confirm button', async () => {
  registerMessageBoxResult(0)
  await expect(ConfirmPromptElectron.promptError('Oops', 'Close', 'Error')).resolves.toBe(true)
})

test('promptError - returns false for an unexpected button', async () => {
  registerMessageBoxResult(1)
  await expect(ConfirmPromptElectron.promptError('Oops', 'Close', 'Error')).resolves.toBe(false)
})

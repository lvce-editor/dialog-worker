import { expect, test } from '@jest/globals'
import { RendererWorker, SharedProcess } from '@lvce-editor/rpc-registry'
import * as ElectronDialog from '../src/parts/ElectronDialog/ElectronDialog.ts'

test('showMessageBox', async () => {
  const calls: { readonly method: string; readonly options: unknown }[] = []
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'(): number {
      return 12
    },
  })
  SharedProcess.registerMockRpc({
    'ElectronDialog.showMessageBox'(options: unknown): number {
      calls.push({ method: 'ElectronDialog.showMessageBox', options })
      return 1
    },
  })
  const result = await ElectronDialog.showMessageBox({
    buttons: ['No', 'Yes'],
    defaultId: 1,
    message: 'Continue?',
    title: 'Question',
    type: 'question',
  })
  expect(result).toBe(1)
  expect(calls).toEqual([
    {
      method: 'ElectronDialog.showMessageBox',
      options: {
        buttons: ['No', 'Yes'],
        defaultId: 1,
        message: 'Continue?',
        productName: 'Lvce Editor - OSS',
        title: 'Question',
        type: 'question',
        windowId: 12,
      },
    },
  ])
})

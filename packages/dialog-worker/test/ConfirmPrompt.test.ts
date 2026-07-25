import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MainProcess, registerMockRpc, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ConfirmPrompt from '../src/parts/ConfirmPrompt/ConfirmPrompt.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const registerWebPrompt = (result: boolean, calls: string[]): void => {
  registerMockRpc(RpcId.RendererProcess, {
    'ConfirmPrompt.prompt'(message: string): boolean {
      calls.push(message)
      return result
    },
  })
}

const registerElectronPrompt = (result: number, calls: unknown[]): void => {
  RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'(): number {
      return 12
    },
  })
  MainProcess.registerMockRpc({
    'ElectronDialog.showMessageBox'(options: unknown): number {
      calls.push(options)
      return result
    },
  })
}

test('prompt - defaults to web behavior', async () => {
  const calls: string[] = []
  registerWebPrompt(true, calls)
  await expect(ConfirmPrompt.prompt('Continue?')).resolves.toBe(true)
  expect(calls).toEqual(['Continue?'])
})

test('prompt - web', async () => {
  const calls: string[] = []
  registerWebPrompt(false, calls)
  await expect(ConfirmPrompt.prompt('Continue?', { platform: PlatformType.Web })).resolves.toBe(false)
  expect(calls).toEqual(['Continue?'])
})

test('prompt - electron', async () => {
  const calls: unknown[] = []
  registerElectronPrompt(1, calls)
  await expect(
    ConfirmPrompt.prompt('Continue?', {
      cancelMessage: 'No',
      confirmMessage: 'Yes',
      platform: PlatformType.Electron,
      title: 'Question',
    }),
  ).resolves.toBe(true)
  expect(calls).toEqual([
    {
      buttons: ['No', 'Yes'],
      defaultId: 1,
      message: 'Continue?',
      productName: 'Lvce Editor - OSS',
      title: 'Question',
      type: 'question',
      windowId: 12,
    },
  ])
})

test('showErrorMessage - defaults to web behavior', async () => {
  const calls: string[] = []
  registerWebPrompt(true, calls)
  await expect(ConfirmPrompt.showErrorMessage({ message: 'Oops' })).resolves.toBe(true)
  expect(calls).toEqual(['Oops'])
})

test('showErrorMessage - web', async () => {
  const calls: string[] = []
  registerWebPrompt(false, calls)
  await expect(ConfirmPrompt.showErrorMessage({ message: 'Oops', platform: PlatformType.Web })).resolves.toBe(false)
  expect(calls).toEqual(['Oops'])
})

test('showErrorMessage - electron', async () => {
  const calls: unknown[] = []
  registerElectronPrompt(0, calls)
  await expect(
    ConfirmPrompt.showErrorMessage({
      confirmMessage: 'Close',
      message: 'Oops',
      platform: PlatformType.Electron,
      title: 'Error',
    }),
  ).resolves.toBe(true)
  expect(calls).toEqual([
    {
      buttons: ['Close'],
      defaultId: 0,
      message: 'Oops',
      productName: 'Lvce Editor - OSS',
      title: 'Error',
      type: 'error',
      windowId: 12,
    },
  ])
})

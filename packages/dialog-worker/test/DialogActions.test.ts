import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../src/parts/DialogState/DialogState.ts'
import * as DialogStates from '../src/parts/DialogStates/DialogStates.ts'
import * as HandleClickButton from '../src/parts/HandleClickButton/HandleClickButton.ts'
import * as HandleClickClose from '../src/parts/HandleClickClose/HandleClickClose.ts'
import * as HandleFocusIn from '../src/parts/HandleFocusIn/HandleFocusIn.ts'

const state: DialogState = {
  closeMessage: 'Cancel',
  confirmMessage: 'Ok',
  focusId: 1,
  message: 'Message',
  title: 'Title',
  type: 'warning',
  uid: 1,
}

test('confirm button closes the dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget'(): void {},
  })
  await expect(HandleClickButton.handleClickButton(state)).resolves.toBe(state)
  expect(mockRendererWorkerRpc.invocations).toEqual([['Viewlet.closeWidget', 'Dialog']])
})

test('close button closes the dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget'(): void {},
  })
  await expect(HandleClickClose.handleClickClose(state)).resolves.toBe(state)
  expect(mockRendererWorkerRpc.invocations).toEqual([['Viewlet.closeWidget', 'Dialog']])
})

test('focus in sets the dialog focus context', async () => {
  DialogStates.set(state.uid, state, state)
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'(): void {},
  })
  const command = DialogStates.wrapAsyncCommand(HandleFocusIn.handleFocusIn)
  await command(state.uid)
  expect(mockRendererWorkerRpc.invocations).toEqual([['Focus.setFocus', 7]])
  expect(DialogStates.get(state.uid).newState).toBe(state)
})

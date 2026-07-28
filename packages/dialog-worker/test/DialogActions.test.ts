import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DialogState } from '../src/parts/DialogState/DialogState.ts'
import * as DialogStates from '../src/parts/DialogStates/DialogStates.ts'
import * as HandleClickButton from '../src/parts/HandleClickButton/HandleClickButton.ts'
import * as HandleClickClose from '../src/parts/HandleClickClose/HandleClickClose.ts'
import * as HandleFocusIn from '../src/parts/HandleFocusIn/HandleFocusIn.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as HandleSubmit from '../src/parts/HandleSubmit/HandleSubmit.ts'

const state: DialogState = {
  closeMessage: 'Cancel',
  confirmMessage: 'Ok',
  focusId: 1,
  kind: 'message',
  message: 'Message',
  password: '',
  requestId: '',
  title: 'Title',
  type: 'warning',
  uid: 1,
  username: '',
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

test('updates basic auth credentials', () => {
  const authState: DialogState = {
    ...state,
    kind: 'basic-auth',
    requestId: '12:1',
  }

  const withUsername = HandleInput.handleInput(authState, 'Username', 'admin')
  const withPassword = HandleInput.handleInput(withUsername, 'Password', 'secret')

  expect(withPassword).toMatchObject({
    password: 'secret',
    username: 'admin',
  })
  expect(HandleInput.handleInput(withPassword, 'Unknown', 'value')).toBe(withPassword)
})

test('submits basic auth credentials after closing the dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'ElectronBrowserView.acceptLogin'(): void {},
    'Viewlet.closeWidget'(): void {},
  })
  const authState: DialogState = {
    ...state,
    kind: 'basic-auth',
    password: 'secret',
    requestId: '12:1',
    username: 'admin',
  }

  await HandleSubmit.handleSubmit(authState)

  expect(mockRendererWorkerRpc.invocations).toEqual([
    ['Viewlet.closeWidget', 'Dialog'],
    ['ElectronBrowserView.acceptLogin', '12:1', 'admin', 'secret'],
  ])
})

test('close button cancels basic auth after closing the dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'ElectronBrowserView.cancelLogin'(): void {},
    'Viewlet.closeWidget'(): void {},
  })
  const authState: DialogState = {
    ...state,
    kind: 'basic-auth',
    requestId: '12:1',
  }

  await HandleClickClose.handleClickClose(authState)

  expect(mockRendererWorkerRpc.invocations).toEqual([
    ['Viewlet.closeWidget', 'Dialog'],
    ['ElectronBrowserView.cancelLogin', '12:1'],
  ])
})

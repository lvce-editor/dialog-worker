import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'
import * as RegisterDialogViewCommands from '../src/parts/RegisterDialogViewCommands/RegisterDialogViewCommands.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('exposes dialog commands', () => {
  expect(Object.keys(CommandMap.commandMap).filter((key) => key.startsWith('Dialog.'))).toEqual([
    'Dialog.create',
    'Dialog.diff2',
    'Dialog.dispose',
    'Dialog.getCommandIds',
    'Dialog.getKeyBindings',
    'Dialog.handleClickButton',
    'Dialog.handleClickClose',
    'Dialog.handleFocusIn',
    'Dialog.handleInput',
    'Dialog.handleSubmit',
    'Dialog.loadContent2',
    'Dialog.render2',
    'Dialog.renderEventListeners',
    'Dialog.show',
    'Dialog.showWarning',
  ])
})

test('exposes the basic auth prompt command', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'(): void {},
  })
  await CommandMap.commandMap['BasicAuthPrompt.show']({
    host: 'proxy.example.com',
    isProxy: true,
    port: 8080,
    realm: '',
    requestId: '12:2',
    scheme: 'basic',
    url: 'https://proxy.example.com:8080/private',
  })
  expect(mockRendererWorkerRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'Dialog',
      {
        closeMessage: 'Cancel',
        confirmMessage: 'Sign In',
        kind: 'basic-auth',
        message: 'proxy.example.com:8080 is requesting your username and password.',
        requestId: '12:2',
        title: 'Proxy Authentication Required',
      },
    ],
  ])
})

test('registers dialog view commands', () => {
  RegisterDialogViewCommands.registerDialogViewCommands()
  expect(CommandMap.commandMap['Dialog.getCommandIds']()).toEqual([
    'handleClickButton',
    'handleClickClose',
    'handleFocusIn',
    'handleInput',
    'handleSubmit',
  ])
})

test('provides escape key binding', () => {
  expect(GetKeyBindings.getKeyBindings()).toEqual([
    {
      command: 'Dialog.handleClickClose',
      key: 8,
      when: 7,
    },
  ])
})

test('provides dialog event listeners', () => {
  expect(RenderEventListeners.renderEventListeners()).toEqual([
    {
      name: 2,
      params: ['handleClickButton', 'event.target.name'],
    },
    {
      name: 1,
      params: ['handleClickClose'],
    },
    {
      name: 3,
      params: ['handleFocusIn'],
    },
    {
      name: 5,
      params: ['handleInput', 'event.target.name', 'event.target.value'],
    },
    {
      name: 6,
      params: ['handleSubmit'],
      preventDefault: true,
    },
    {
      name: 4,
      params: [],
      preventDefault: true,
    },
  ])
})

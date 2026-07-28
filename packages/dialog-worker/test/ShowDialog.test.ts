import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as BasicAuthPrompt from '../src/parts/BasicAuthPrompt/BasicAuthPrompt.ts'
import * as ShowDialog from '../src/parts/ShowDialog/ShowDialog.ts'
import * as ShowWarning from '../src/parts/ShowWarning/ShowWarning.ts'

test('showDialog opens the dialog widget', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'(): void {},
  })
  const options = {
    message: 'Message',
    title: 'Title',
    type: 'info' as const,
  }
  await ShowDialog.showDialog(options)
  expect(mockRendererWorkerRpc.invocations).toEqual([['Viewlet.openWidget', 'Dialog', options]])
})

test('showWarning opens a warning dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'(): void {},
  })
  await ShowWarning.showWarning({
    message: "Your browser doesn't support opening local folders.",
    title: 'Opening Local Folders is Unsupported',
  })
  expect(mockRendererWorkerRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'Dialog',
      {
        message: "Your browser doesn't support opening local folders.",
        title: 'Opening Local Folders is Unsupported',
        type: 'warning',
      },
    ],
  ])
})

test('show basic auth opens a dedicated credentials dialog', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'(): void {},
  })
  await BasicAuthPrompt.show({
    host: 'example.com',
    isProxy: false,
    port: 443,
    realm: 'Private Area',
    requestId: '12:1',
    scheme: 'basic',
    url: 'https://example.com/private',
  })
  expect(mockRendererWorkerRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'Dialog',
      {
        closeMessage: 'Cancel',
        confirmMessage: 'Sign In',
        kind: 'basic-auth',
        message: 'example.com is requesting your username and password. Realm: Private Area',
        requestId: '12:1',
        title: 'Authentication Required',
      },
    ],
  ])
})

test('show basic auth omits the default HTTP port', async () => {
  using mockRendererWorkerRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'(): void {},
  })
  await BasicAuthPrompt.show({
    host: 'example.com',
    isProxy: false,
    port: 80,
    realm: '',
    requestId: '12:3',
    scheme: 'basic',
    url: ['http:', '//example.com/private'].join(''),
  })
  expect(mockRendererWorkerRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'Dialog',
      {
        closeMessage: 'Cancel',
        confirmMessage: 'Sign In',
        kind: 'basic-auth',
        message: 'example.com is requesting your username and password.',
        requestId: '12:3',
        title: 'Authentication Required',
      },
    ],
  ])
})

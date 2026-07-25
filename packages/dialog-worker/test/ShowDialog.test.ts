import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
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
